import { useEffect, useState, useTransition } from "react";
import { usePeerStore } from "@/store/peer-store";
import { CHARGE_RATE_PER_SEC } from "@/lib/constants";
import { useUserStore } from "@/store/user-store";
import { useAppStore } from "@/store/app-store";
import { handleTransfer, handleUpdateCallSummary } from "@/lib";
import { startTimer, stopTimer } from "@/lib/utils";

export function useCall() {
  const currentUser = useUserStore((store) => store.user);
  const [callTime, setCallTime] = useState(0);

  const [pending, startTransition] = useTransition();
  const { callSummary, setCallSummary, callDialog } = useAppStore((store) => ({
    setCallSummary: store.setCallSummary,
    callSummary: store.callSummary,
    callDialog: store.callDialog,
  }));

  const { startCall, endCall, activeCall } = usePeerStore((store) => ({
    startCall: store.startCall,
    endCall: store.endCall,
    activeCall: store.activeCall,
  }));

  const call = async (receiverId: string) => {
    if (!currentUser) return;

    startTransition(() => {
      (async () => {
        try {
          await startCall(receiverId);
        } catch (error) {
          console.error(error);
        }
      })();
    });
  };

  const end = async () => {
    if (!currentUser) return;

    startTransition(() => {
      const endTime = Date.now();

      (async () => {
        endCall();

        if (callSummary) {
          const duration = (endTime - callSummary.startTime) / 1000; // in seconds
          const cost = duration * CHARGE_RATE_PER_SEC;

          if (currentUser.id === callSummary.callerId) {
            const updatedCallSummary: CallSummary = {
              ...callSummary,
              endTime,
              duration,
              cost,
            };

            setCallSummary(updatedCallSummary);

            try {
              await handleUpdateCallSummary(updatedCallSummary);
            } catch (error) {
              console.error("Error updating endcall summary: ", error);
            }
          }
          try {
            // Update user balances
            await handleTransfer(
              callSummary.callerId,
              callSummary.receiverId,
              cost
            );
          } catch (error) {
            console.error("Error transfering call: ", error);
          }
        }
      })();
    });
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (activeCall) {
      setCallTime(0);
      interval = startTimer(setCallTime);
    }

    activeCall?.on("close", () => {
      endCall();
      stopTimer(interval);
    });

    return () => {
      stopTimer(interval);
    };
  }, [activeCall]);

  useEffect(() => {
    if (!callDialog && callTime > 0) setCallTime(0);
  }, [callDialog, callTime]);

  return {
    call,
    end,
    pending,
    activeCallSummary: callSummary,
    callTime,
  };
}
