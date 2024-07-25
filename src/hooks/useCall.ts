import { useTransition } from "react";
import { usePeerStore } from "@/store/peer-store";
import Firebase from "@/lib/services/firebase";
import { CHARGE_RATE_PER_SEC } from "@/lib/constants";
import { useUserStore } from "@/store/user-store";
import { useAppStore } from "@/store/app-store";

export function useCall() {
  const currentUser = useUserStore((store) => store.user);

  const [pending, startTransition] = useTransition();
  const { callSummary, setCallSummary } = useAppStore((store) => ({
    setCallSummary: store.setCallSummary,
    callSummary: store.callSummary,
  }));

  const { startCall, endCall } = usePeerStore((store) => ({
    startCall: store.startCall,
    endCall: store.endCall,
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
    if (!callSummary || !currentUser) return;

    startTransition(() => {
      (async () => {
        try {
          endCall();

          const endTime = Date.now();
          const duration = (endTime - callSummary.startTime) / 1000; // in seconds
          const cost = duration * CHARGE_RATE_PER_SEC;

          if (currentUser.id === callSummary.receiverId) {
            const updatedCallSummary: CallSummary = {
              ...callSummary,
              endTime,
              duration,
              cost,
            };

            setCallSummary(updatedCallSummary);

            await Firebase.updateCallSummary(
              callSummary.callerId,
              updatedCallSummary
            );
          }

          // Update user balances
          const caller = await Firebase.getUser(callSummary.callerId);
          const receiver = await Firebase.getUser(callSummary.receiverId);

          if (!caller || !receiver) return;

          if (currentUser.id === callSummary.receiverId) {
            // increment receiver balance
            await Firebase.updateUser(currentUser.id, {
              ...caller,
              balance: caller.balance + cost,
            });

            // deduct from user
            await Firebase.updateUser(receiver.id, {
              ...receiver,
              balance: receiver.balance - cost,
            });
          } else {
            await Firebase.updateUser(currentUser.id, {
              ...caller,
              balance: caller.balance - cost,
            });
            await Firebase.updateUser(receiver.id, {
              ...receiver,
              balance: receiver.balance + cost,
            });
          }
        } catch (error) {
          console.error("Error ending call:", error);
        }
      })();
    });
  };

  return {
    call,
    end,
    pending,
    activeCallSummary: callSummary,
  };
}
