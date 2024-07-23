import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { useAppStore } from "@/store/app-store";
import { useCall } from "@/hooks/useCall";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "./ui/button";

const CallDialog = () => {
  const dialogOpen = useAppStore((store) => store.callDialogOpen);

  const { user: currentUser } = useAuth();

  const {
    activeCall,
    startCall,
    endCall,
    remoteVideoRef,
    currentUserVideoRef,
  } = useCall(currentUser);

  return (
    <Dialog defaultOpen={dialogOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Incoming Call</DialogTitle>
          <DialogDescription>Incoming call from </DialogDescription>
        </DialogHeader>

        <div>
          <video ref={remoteVideoRef} />

          <video ref={currentUserVideoRef} />
        </div>

        <Button onClick={endCall}>End Call</Button>
      </DialogContent>
    </Dialog>
  );
};

export default CallDialog;
