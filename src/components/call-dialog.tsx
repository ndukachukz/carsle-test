import { LoaderIcon } from "lucide-react";
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
import { CHARGE_RATE_PER_MIN } from "@/lib/constants";
import { usePeerStore } from "@/store/peer-store";
import { formatDuration } from "@/lib/utils";
import { useUserStore } from "@/store/user-store";

const CallDialog = () => {
  const user = useUserStore((store) => store.user);
  const {
    callDialog: dialogOpen,
    callReceiver,
    setCallDialog,
    setCallSummary,
  } = useAppStore();

  const { activeCall, currentVideo } = usePeerStore((store) => ({
    activeCall: store.activeCall,
    currentVideo: store.currentVideo,
  }));

  const callStarted = !!currentVideo && !!activeCall;

  const { end, pending, call, activeCallSummary, callTime } = useCall();

  const handleStartCall = () => {
    if (!callReceiver) return;
    call(callReceiver);
  };

  const handleEndCall = () => {
    end();
  };

  return (
    <Dialog
      defaultOpen={dialogOpen}
      open={dialogOpen}
      onOpenChange={(open) => {
        if (!open) {
          handleEndCall();
          setCallSummary(null);
        }
        setCallDialog(open);
      }}
    >
      <DialogContent
        className="max-h-[90vh] md:min-w-[100vh] overflow-y-scroll"
        aria-describedby="call-dialog"
      >
        <DialogHeader>
          <DialogTitle>
            {!callReceiver ? "Incoming Call" : "Consult"}
          </DialogTitle>
        </DialogHeader>

        <div>
          <div className="mb-3">
            {/* render call details when call active */}

            <p>Charge rate: {CHARGE_RATE_PER_MIN} $/minute</p>

            {callTime > 0 && (
              <>
                <br />
                <p>call time: {formatDuration(callTime)} </p>
              </>
            )}

            {activeCallSummary?.cost && (
              <>
                <br />
                <p>cost: {activeCallSummary.cost.toFixed(2)} </p>
              </>
            )}

            <br />
            <p>balance: {user?.balance.toFixed(2)}</p>
          </div>
          <Call />
        </div>

        <DialogFooter>
          {callReceiver && (
            <Button onClick={handleStartCall} disabled={pending}>
              start call {pending && <LoaderIcon className="animate-spin" />}
            </Button>
          )}

          {callStarted && (
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
