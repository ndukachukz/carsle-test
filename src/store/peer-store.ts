import { closeUserMedia, genId, getUserMedia } from "@/lib/utils";
import Peer, { MediaConnection } from "peerjs";
import { create } from "zustand";
import { useUserStore } from "./user-store";
import { useAppStore } from "./app-store";
import FirebaseService from "@/lib/services/firebase-service";

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
    const peer = get().peer ?? new Peer(userId);

    set(() => ({ peer }));

    return peer;
  },

  startCall: async (receiverId: string) => {
    const callId = genId();
    const user = useUserStore.getState().user;
    const setCallSummary = useAppStore.getState().setCallSummary;

    const peer = get().peer;

    const stream = await getUserMedia();

    if (!peer) throw new Error("Peer not initialized");

    const call = peer.call(receiverId, stream, {
      metadata: { callId, user: user?.name },
    });

    set(() => ({ currentVideo: stream }));

    call.on("stream", async (remoteStream) => {
      const newCall: CallSummary = {
        id: callId,
        callerId: user!.id,
        receiverId: receiverId,
        startTime: Date.now(),
      };

      setCallSummary(newCall);

      set(() => ({ remoteVideo: remoteStream, activeCall: call }));

      await FirebaseService.createCallSummary(newCall);
    });
  },

  answerCall: async (call: MediaConnection) => {
    const peer = get().peer; // current user peer instance

    if (!peer) return;

    const stream = await getUserMedia();
    const setCallSummary = useAppStore.getState().setCallSummary;

    set(() => ({ currentVideo: stream, activeCall: call }));

    call.answer(stream);

    call.on("stream", (remoteStream) => {
      set(() => ({ remoteVideo: remoteStream }));
    });

    const callSummary = await FirebaseService.getCallSummary(
      call.peer,
      peer.id,
      call.metadata.callId
    );

    console.log(" => ", callSummary);

    if (callSummary) {
      console.log("gotten Call Summary => ", callSummary);
      setCallSummary(callSummary);
    }
  },

  endCall() {
    const { activeCall, currentVideo, remoteVideo } = get();
    if (activeCall) {
      activeCall.close();
    }

    closeUserMedia(currentVideo);
    closeUserMedia(remoteVideo);

    set(() => ({ activeCall: null, currentVideo: null, remoteVideo: null }));
  },
}));
