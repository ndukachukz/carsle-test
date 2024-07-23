/* eslint-disable @typescript-eslint/no-unused-vars */

enum PeerActionType {
  PEER_SESSION_START = "PEER_SESSION_START",
  PEER_SESSION_STOP = "PEER_SESSION_STOP",
  PEER_LOADING = "PEER_LOADING",
}

interface PeerState {
  readonly id?: string;
  readonly loading: boolean;
  readonly started: boolean;
}
