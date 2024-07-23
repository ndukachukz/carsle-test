import { useRef, useState } from "react";
import { peerService } from "../lib/services/peer";
import { api } from "../lib/services/api";

const CHARGE_RATE = 0.1; // $0.1 per second

export function useCall(currentUser: User | null) {
  const [activeCall, setActiveCall] = useState<Call | null>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const currentUserVideoRef = useRef<HTMLVideoElement>(null);

  const startCall = async (receiverId: string) => {
    if (!currentUser) return;

    const newCall: Omit<Call, "id"> = {
      callerId: currentUser.id,
      receiverId,
      startTime: Date.now(),
    };

    const createdCall = await api.createCall(newCall);
    setActiveCall(createdCall);

    // Initialize PeerJS call here
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });

    peerService.call(receiverId, stream);
  };

  const endCall = async () => {
    if (!activeCall || !currentUser) return;

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

    setActiveCall(null);
  };

  return {
    activeCall,
    startCall,
    endCall,
    remoteVideoRef,
    currentUserVideoRef,
  };
}
