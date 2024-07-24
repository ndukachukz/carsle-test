import { useEffect, useRef, useState } from "react";
// import { api } from "../lib/services/api";
import { usePeerStore } from "@/store/peer-store";

// const CHARGE_RATE = 0.1; // $0.1 per second

export function useCall(currentUser: User | null) {
  const [activeCall, setActiveCall] = useState<Omit<Call, "id"> | null>(null);

  const { currentVideo, remoteVideo, call } = usePeerStore((store) => ({
    currentVideo: store.currentVideo,
    remoteVideo: store.remoteVideo,
    peer: store.peer,
    call: store.call,
  }));

  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const currentUserVideoRef = useRef<HTMLVideoElement>(null);

  const startCall = async (receiverId: string) => {
    if (!currentUser) return;

    const newCall: Omit<Call, "id"> = {
      callerId: currentUser.id,
      receiverId,
      startTime: Date.now(),
    };

    setActiveCall(newCall);

    // const createdCall = await api.createCall(newCall);

    console.log("Calling... ", receiverId);

    await call(receiverId);
  };

  const endCall = async () => {
    if (!activeCall || !currentUser) return;
    /* 
    const endTime = Date.now();
    const duration = (endTime - activeCall.startTime) / 1000; // in seconds
    const cost = duration * CHARGE_RATE;

     const updatedCall: Call = {
      ...activeCall,
      endTime,
      duration,
      cost,
    };

    await api.updateCall(updatedCall);

    // Update user balances
    const caller = await api.getUser(activeCall.callerId);
    const receiver = await api.getUser(activeCall.receiverId);

    if (caller.isAgent) {
      await api.updateUser({ ...caller, balance: caller.balance + cost });
      await api.updateUser({ ...receiver, balance: receiver.balance - cost });
    } else {
      await api.updateUser({ ...caller, balance: caller.balance - cost });
      await api.updateUser({ ...receiver, balance: receiver.balance + cost });
    }
 */
    setActiveCall(null);
  };

  useEffect(() => {
    if (remoteVideoRef.current) {
      remoteVideoRef.current.srcObject = remoteVideo;
      remoteVideoRef.current.play();
    }

    if (currentUserVideoRef.current) {
      currentUserVideoRef.current.srcObject = currentVideo;
      currentUserVideoRef.current.play();
    }
  }, [remoteVideo, currentVideo, remoteVideoRef, currentUserVideoRef]);

  return {
    activeCall,
    startCall,
    endCall,
    remoteVideoRef,
    currentUserVideoRef,
  };
}
