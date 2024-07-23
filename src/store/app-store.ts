import Peer from "peerjs";
import { create } from "zustand";

interface AppState {
  user: User | null;
  setUser(user: AppState["user"]): void;
  peer: Peer | null;
  setPeer(peer: AppState["peer"]): void;
  peerId: string | null;
  setPeerId(peerId: AppState["peerId"]): void;
  callDialogOpen: boolean;
  openCallDialog(): void;
  closeCallDialog(): void;
  receiverId: string | null;
  setReceiverId(receiverId: AppState["receiverId"]): void;
}

export const useAppStore = create<AppState>()((set) => ({
  user: null,
  peer: null,
  peerId: null,
  callDialogOpen: false,
  receiverId: null,
  setPeer: (peer) => set(() => ({ peer })),
  setUser: (user) => set(() => ({ user })),
  setPeerId: (peerId) => set(() => ({ peerId })),
  openCallDialog: () => set(() => ({ callDialogOpen: true })),
  closeCallDialog: () => set(() => ({ callDialogOpen: false })),
  setReceiverId: (receiverId) => set(() => ({ receiverId })),
}));
