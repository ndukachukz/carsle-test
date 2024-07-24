import { create } from "zustand";

interface AppState {
  callDialogOpen: boolean;
  openCallDialog(): void;
  closeCallDialog(): void;
}

export const useAppStore = create<AppState>()((set) => ({
  callDialogOpen: false,
  openCallDialog: () => set(() => ({ callDialogOpen: true })),
  closeCallDialog: () => set(() => ({ callDialogOpen: false })),
}));
