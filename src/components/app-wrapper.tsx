import React, { useEffect } from "react";
import { useAppStore } from "@/store/app-store";
import { useAuth } from "@/hooks/useAuth";
import CallDialog from "./call-dialog";
import { usePeerStore } from "@/store/peer-store";

function AppWrapper({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();

  const { setPeerId, initialize, peer, answer } = usePeerStore((store) => ({
    setPeerId: store.setPeerId,
    answer: store.answer,
    initialize: store.initialize,
    peer: store.peer,
  }));

  const { openCallDialog, closeCallDialog } = useAppStore((store) => ({
    openCallDialog: store.openCallDialog,
    closeCallDialog: store.closeCallDialog,
  }));

  useEffect(() => {
    if (user && !peer) initialize(user.id);
  }, [user, peer, initialize]);

  useEffect(() => {
    if (!user || !peer) {
      return;
    }

    console.log("USER => ", user);

    peer.on("open", (id) => {
      setPeerId(id);
      console.log("PEER ID: " + peer.id);
    });

    peer.on("error", (error) => {
      console.log(error);
    });

    peer.on("disconnected", (id) => {
      console.log("disconnected from signaling server ", id);
    });

    peer.on("call", async (call) => {
      console.log("call came in from " + call.peer);

      if (confirm(`Accept call from ${call.peer}?`)) {
        openCallDialog();
        await answer(call);
      }
    });

    return () => {
      peer.destroy();
      closeCallDialog();
    };
  }, [peer]);

  return (
    <>
      {children}

      <CallDialog />
    </>
  );
}

export default AppWrapper;
