import Peer, { MediaConnection } from "peerjs";
import { create } from "zustand";

interface PeerState {
  peer: Peer | null;
  setPeer(peer: PeerState["peer"]): void;
  peerId: string | null;
  setPeerId(peerId: PeerState["peerId"]): void;

  remoteVideo: MediaStream | null;
  setRemoteVideo(remoteVideo: PeerState["remoteVideo"]): void;
  currentVideo: MediaStream | null;
  setCurrentVideo(currentVideo: PeerState["currentVideo"]): void;

  initialize(userId: string): Peer;
}

export const usePeerStore = create<PeerState>()((set) => ({
  user: null,
  peer: null,
  peerId: null,
  remoteVideo: null,
  currentVideo: null,
  setCurrentVideo: (currentVideo) => set(() => ({ currentVideo })),
  setRemoteVideo: (remoteVideo) => set(() => ({ remoteVideo })),
  setPeer: (peer) => set(() => ({ peer })),
  setPeerId: (peerId) => set(() => ({ peerId })),

  initialize: (userId) => {
    const peer = new Peer(userId);

    set(() => ({ peer }));

    return peer;
  },
}));

export async function call(userId: string) {
  const peer = new Peer();

  // Initialize PeerJS call here
  const stream = await navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true,
  });

  if (!peer) throw new Error("Peer not initialized");

  usePeerStore.getState().setCurrentVideo(stream);

  const call = peer.call(userId, stream);

  call.on("stream", (remoteStream) => {
    usePeerStore.getState().setRemoteVideo(remoteStream);
  });

  console.log(call);
}

export async function answer(call: MediaConnection) {
  const stream = await navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true,
  });

  console.log("MEDIA STREAM => ", stream);
  usePeerStore.getState().setCurrentVideo(stream);

  call.answer(stream);

  call.on("stream", (remoteStream) => {
    console.log("REMOTE STREAM => ", remoteStream);
    usePeerStore.getState().setRemoteVideo(remoteStream);
  });
}
