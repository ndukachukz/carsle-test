import React, { useEffect } from "react";
import { useAppStore } from "@/store/app-store";
import { useAuth } from "@/hooks/useAuth";
import IncomingCallDialog from "./call-dialog";
import { usePeerStore } from "@/store/peer-store";

function AppWrapper({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();

  const { initialize, peer, answer } = usePeerStore((store) => ({
    answer: store.answerCall,
    initialize: store.initialize,
    peer: store.peer,
  }));

  const setCallDialog = useAppStore((store) => store.setCallDialog);

  useEffect(() => {
    if (user && !peer) initialize(user.id);
  }, [user, peer, initialize]);

  useEffect(() => {
    if (!user || !peer) {
      return;
    }

    console.log("USER => ", user.name);

    peer.on("open", () => {
      console.log("PEER ID: ", peer.id);
    });

    peer.on("error", (error) => {
      if (error.type === "network" || error.type === "unavailable-id") {
        peer.reconnect();
      }
      console.error(error);
    });

    peer.on("disconnected", (id) => {
      console.log("disconnected from signaling server ", id);
    });

    peer.on("call", async (call) => {
      console.log("call came in from " + call.peer);

      if (confirm(`Accept call from ${call.peer}?`)) {
        setCallDialog(true);
        await answer(call);
      }
    });

    return () => {
      peer.destroy();
      setCallDialog(false);
    };
  }, [peer]);

  return (
    <React.Fragment>
      {children}

      <IncomingCallDialog />
    </React.Fragment>
  );
}

export default AppWrapper;
