import { create } from "zustand";

interface AppState {
  callDialog: boolean;
  setCallDialog(
    bool: AppState["callDialog"],
    receiver?: AppState["callReceiver"]
  ): void;
  callReceiver: string | null;

  callSummary: CallSummary | null;
  setCallSummary(callSummary: CallSummary): void;
}

export const useAppStore = create<AppState>()((set) => ({
  callDialog: false,
  callReceiver: null,
  callSummary: null,
  setCallDialog: (bool, receiver = null) =>
    set(() => ({ callDialog: bool, callReceiver: receiver })),
  setCallSummary: (callSummary) => set(() => ({ callSummary })),
}));
