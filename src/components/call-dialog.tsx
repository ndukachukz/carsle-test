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
import { Input } from "./ui/input";
import { useEffect, useState } from "react";

const CallDialog = () => {
  const user = useUserStore((store) => store.user);
  const {
    callDialog: dialogOpen,
    uid: callReceiver,
    setCallDialog,
    setCallSummary,
  } = useAppStore();

  const { activeCall, currentVideo } = usePeerStore((store) => ({
    activeCall: store.activeCall,
    currentVideo: store.currentVideo,
  }));

  const callStarted = !!currentVideo && !!activeCall;

  const { end, pending, call, activeCallSummary, callTime } = useCall();
  const [callLimit, setCallLimit] = useState<number>(0);

  const handleStartCall = () => {
    if (!callReceiver) return;
    call(callReceiver);
  };

  const handleEndCall = () => {
    end();
  };

  useEffect(() => {
    if (activeCall && callLimit > 0) {
      if (callTime / 60 === callLimit) {
        handleEndCall();
      }
    }
  }, [activeCall, callLimit, callTime]);

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
            {callReceiver === user?.id ? "Incoming Call" : "Consult"}
          </DialogTitle>
        </DialogHeader>

        <div>
          <div className="mb-3 grid gap-3">
            {/* render call details when call active */}

            <p>Charge rate: {CHARGE_RATE_PER_MIN.toPrecision(2)} $/minute</p>

            {callTime > 0 && (
              <>
                <p>call time: {formatDuration(callTime)} </p>
              </>
            )}

            {activeCallSummary?.cost && (
              <>
                <p>cost: {activeCallSummary.cost.toFixed(2)} </p>
              </>
            )}

            {activeCall && callLimit > 0 && <p>call limit: {callLimit}</p>}

            <p>balance: {user?.balance.toFixed(2)}</p>

            {!activeCall && callReceiver !== user?.id && (
              <label>
                Call limit:
                <Input
                  placeholder="call limit in minutes"
                  type="number"
                  disabled={!!activeCall}
                  value={callLimit}
                  maxLength={2}
                  max={5}
                  required
                  onChange={(e) => setCallLimit(parseInt(e.target.value))}
                  className="sm:w-1/2"
                />
              </label>
            )}
          </div>
          <Call />
        </div>

        <DialogFooter>
          {callReceiver !== user?.id && !activeCall && (
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
