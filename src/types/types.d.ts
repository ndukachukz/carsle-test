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

// User.ts
interface User {
  id: string;
  name: string;
  balance: number;
  isAgent: boolean;
  photo_url: string;
}

// Call.ts
interface Call {
  id: string;
  callerId: string;
  receiverId: string;
  startTime: number;
  endTime?: number;
  duration?: number;
  cost?: number;
}
