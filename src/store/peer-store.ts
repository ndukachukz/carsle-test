import { genId, getUserMedia } from "@/lib/utils";
import Peer, { MediaConnection } from "peerjs";
import { create } from "zustand";
import { useUserStore } from "./user-store";
import { useAppStore } from "./app-store";
import Firebase from "@/lib/services/firebase";

interface PeerState {
  peer: Peer | null;
  activeCall: MediaConnection | null;
  remoteVideo: MediaStream | null;
  setRemoteVideo(remoteVideo: PeerState["remoteVideo"]): void;
  currentVideo: MediaStream | null;
  setCurrentVideo(currentVideo: PeerState["currentVideo"]): void;

  initialize(userId: string): Peer;
  startCall(userId: string): Promise<void>;
  answerCall(call: MediaConnection): Promise<void>;
  endCall: () => void;
}

export const usePeerStore = create<PeerState>()((set, get) => ({
  peer: null,
  activeCall: null,
  remoteVideo: null,
  currentVideo: null,
  setCurrentVideo: (currentVideo) => set(() => ({ currentVideo })),
  setRemoteVideo: (remoteVideo) => set(() => ({ remoteVideo })),

  initialize: (userId) => {
    const peer = new Peer(userId);

    set(() => ({ peer }));

    return peer;
  },

  startCall: async (receiverId: string) => {
    const callId = genId();
    const user = useUserStore.getState().user;
    const setCallSummary = useAppStore.getState().setCallSummary;

    const peer = new Peer();

    // Initialize PeerJS call here
    const stream = await getUserMedia();

    if (!peer) throw new Error("Peer not initialized");

    set(() => ({ currentVideo: stream }));

    const call = peer.call(receiverId, stream, { metadata: { callId } });

    call.on("stream", async (remoteStream) => {
      const newCall: CallSummary = {
        id: callId,
        callerId: user!.id,
        receiverId: receiverId,
        startTime: Date.now(),
      };

      setCallSummary(newCall);

      set(() => ({ remoteVideo: remoteStream, activeCall: call }));
      await Firebase.createCallSummary(user!.id, newCall);
    });
  },

  answerCall: async (call: MediaConnection) => {
    const stream = await getUserMedia();
    const user = useUserStore.getState().user;
    const setCallSummary = useAppStore.getState().setCallSummary;

    set(() => ({ currentVideo: stream, activeCall: call }));

    call.answer(stream);

    call.on("stream", (remoteStream) => {
      console.log("REMOTE STREAM => ", remoteStream);
      set(() => ({ remoteVideo: remoteStream }));
    });

    if (!user) return;

    console.log(call.metadata.callId);

    const callSummary = await Firebase.getCallSummary(
      call.peer,
      user.id,
      call.metadata.callId
    );

    if (callSummary) setCallSummary(callSummary);
  },

  endCall() {
    const { activeCall, currentVideo, remoteVideo } = get();
    if (activeCall) {
      activeCall.close();
    }

    if (currentVideo) {
      currentVideo.getTracks().forEach((track) => track.stop());
    }

    if (remoteVideo) {
      remoteVideo.getTracks().forEach((track) => track.stop());
    }
    set({ activeCall: null, currentVideo: null, remoteVideo: null });
  },
}));
