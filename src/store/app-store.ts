import { create } from "zustand";

interface AppState {
  callDialog: boolean;
  setCallDialog(bool: AppState["callDialog"], uid?: AppState["uid"]): void;

  // peer id
  uid: string | null;

  callSummary: CallSummary | null;
  setCallSummary(callSummary: AppState["callSummary"]): void;

  callSummaryId: string | null;
  setCallSummaryId(callSummaryId: AppState["callSummaryId"]): void;
}

export const useAppStore = create<AppState>()((set) => ({
  callDialog: false,
  uid: null,
  callSummary: null,
  callSummaryId: null,
  setCallDialog: (bool, receiver = null) =>
    set(() => ({ callDialog: bool, uid: receiver })),
  setCallSummary: (callSummary) => set(() => ({ callSummary })),
  setCallSummaryId: (id) => set(() => ({ callSummaryId: id })),
}));
