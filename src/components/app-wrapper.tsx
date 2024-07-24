import React, { useEffect } from "react";
import { useAppStore } from "@/store/app-store";
import { useAuth } from "@/hooks/useAuth";
import CallDialog from "./call-dialog";
import { answer, usePeerStore } from "@/store/peer-store";

function AppWrapper({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();

  const { setPeerId, initialize, peer } = usePeerStore((store) => ({
    setCurrentVideo: store.setCurrentVideo,
    setRemoteVideo: store.setRemoteVideo,
    setPeerId: store.setPeerId,
    initialize: store.initialize,
    peer: store.peer,
  }));

  const openCallDialog = useAppStore((store) => store.openCallDialog);

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

    peer.on("disconnected", (reason) => {
      console.log("disconnected from signaling server ", reason);
    });

    peer.on("call", async (call) => {
      console.log("call came in from " + call.peer);

      if (confirm(`Accept call from ${call.peer}?`)) {
        openCallDialog();
        answer(call);
      }
    });
  }, []);

  return (
    <>
      {children}

      <CallDialog />
    </>
  );
}

export default AppWrapper;
