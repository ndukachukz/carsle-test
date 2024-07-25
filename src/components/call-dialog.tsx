import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { useAppStore } from "@/store/app-store";
import { useCall } from "@/hooks/useCall";
import { Button } from "./ui/button";
import Call from "./call-video";
import { LoaderIcon } from "lucide-react";
import { CHARGE_RATE_PER_MIN } from "@/lib/constants";
import { usePeerStore } from "@/store/peer-store";
import { useEffect } from "react";
import { formatDuration } from "@/lib/utils";
import { useUserStore } from "@/store/user-store";

const CallDialog = () => {
  const user = useUserStore((store) => store.user);
  const { callDialog: dialogOpen, callReceiver, setCallDialog } = useAppStore();
  const activeCall = usePeerStore((store) => store.activeCall);

  const { end, pending, call, activeCallSummary } = useCall();

  const handleStartCall = () => {
    if (!callReceiver) return;
    call(callReceiver);
  };

  const handleEndCall = () => {
    end();
  };

  useEffect(() => {
    activeCall?.on("close", () => {
      console.log("call ended");
      handleEndCall();
    });
  }, [activeCall]);

  return (
    <Dialog
      defaultOpen={dialogOpen}
      open={dialogOpen}
      onOpenChange={setCallDialog}
    >
      <DialogContent className="max-h-[90vh] md:min-w-[100vh] overflow-y-scroll">
        <DialogHeader aria-describedby="">
          <DialogTitle>
            {!callReceiver ? "Incoming Call" : "Consult"}
          </DialogTitle>
        </DialogHeader>

        <div>
          <div className="mb-3">
            {/* render call details when call active */}

            <p>Charge rate $/minute: {CHARGE_RATE_PER_MIN}</p>

            {activeCallSummary?.duration && (
              <>
                <br />
                <p>duration: {formatDuration(activeCallSummary?.duration)} </p>
              </>
            )}

            {activeCallSummary?.cost && (
              <>
                <br />
                <p>cost: {activeCallSummary.cost} </p>
              </>
            )}

            <br />
            <p>balance: {user?.balance}</p>
          </div>
          <Call />
        </div>

        <DialogFooter>
          {!activeCall && (
            <Button onClick={handleStartCall} disabled={pending}>
              start call {pending && <LoaderIcon className="animate-spin" />}
            </Button>
          )}

          {activeCall && (
            <Button onClick={handleEndCall} disabled={pending}>
              End Call {pending && <LoaderIcon className="animate-spin" />}
            </Button>
          )}

          <DialogClose>Close</DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CallDialog;
