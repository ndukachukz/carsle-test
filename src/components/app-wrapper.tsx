import React, { useEffect } from "react";
import { useAppStore } from "@/store/app-store";
import { useAuth } from "@/hooks/useAuth";
import IncomingCallDialog from "./call-dialog";
import { usePeerStore } from "@/store/peer-store";
import { onValue, ref } from "firebase/database";
import { db } from "@/lib/config/firebase";

function AppWrapper({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();

  const { initialize, peer, answer } = usePeerStore((store) => ({
    answer: store.answerCall,
    initialize: store.initialize,
    peer: store.peer,
    activeCall: store.activeCall,
  }));

  const { setCallDialog, callsummary, setCallSummary } = useAppStore(
    (store) => ({
      setCallDialog: store.setCallDialog,
      callsummary: store.callSummary,
      setCallSummary: store.setCallSummary,
    })
  );

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

  useEffect(() => {
    if (!callsummary) return;

    onValue(
      ref(
        db,
        `calls/${callsummary.callerId}:${callsummary.receiverId}/${callsummary.id}`
      ),
      (snapshot) => {
        if (!snapshot.exists()) return;

        const data = snapshot.val();

        setCallSummary(data);
      },
      (error) => {
        console.error("callsummary error => ", error);
      }
    );

    return () => {};
  }, [callsummary, setCallSummary]);

  return (
    <React.Fragment>
      {children}

      <IncomingCallDialog />
    </React.Fragment>
  );
}

export default AppWrapper;
