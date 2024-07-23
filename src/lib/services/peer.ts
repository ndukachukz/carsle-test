import Peer, { MediaConnection } from "peerjs";

class PeerService {
  private peer: Peer | null = null;

  initialize(userId: string) {
    this.peer = new Peer(userId);
    return this.peer;
  }

  call(userId: string, stream: MediaStream) {
    if (!this.peer) throw new Error("Peer not initialized");
    return this.peer.call(userId, stream);
  }

  async answer(call: MediaConnection, cb?: (params: MediaStream) => void) {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });

    cb && cb(stream);

    call.answer(stream);
  }
}

export const peerService = new PeerService();
