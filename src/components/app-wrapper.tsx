import React, { useEffect } from "react";
import { useAppStore } from "@/store/app-store";
import { useAuth } from "@/hooks/useAuth";
import CallDialog from "./call-dialog";
import { usePeerStore } from "@/store/peer-store";
import { off, onValue } from "firebase/database";
import { handleCallSummaryValueChange, handleUserValueChange } from "@/lib";
import { callRef, userRef } from "@/lib/utils";

function AppWrapper({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();

  const { initialize, peer, answer, activeCall } = usePeerStore((store) => ({
    answer: store.answerCall,
    initialize: store.initialize,
    peer: store.peer,
    activeCall: store.activeCall,
  }));

  const { setCallDialog, callSummary } = useAppStore((store) => ({
    setCallDialog: store.setCallDialog,
    callSummary: store.callSummary,
    setCallSummary: store.setCallSummary,
  }));

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

      console.error(error, "\n", error.type, "\n", error.message);
    });

    peer.on("disconnected", (id) => {
      console.log("disconnected from signaling server ", id);
    });

    peer.on("call", async (call) => {
      if (confirm(`Accept call from ${call.metadata.user}?`)) {
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
    if (!activeCall || !callSummary) return;

    onValue(
      callRef(callSummary.callerId, callSummary.receiverId, callSummary.id),
      handleCallSummaryValueChange,
      (error) => {
        console.error("callsummary error => ", error);
      }
    );

    return () => {
      off(
        callRef(callSummary.callerId, callSummary.receiverId, callSummary.id),
        "value",
        handleCallSummaryValueChange
      );
    };
  }, [activeCall]);

  useEffect(() => {
    if (!user) return;

    onValue(userRef(user.id), handleUserValueChange, (error) => {
      console.error("user error => ", error);
    });

    return () => {
      off(userRef(user.id), "value", handleUserValueChange);
    };
  }, [activeCall]);

  return (
    <React.Fragment>
      {children}

      <CallDialog />
    </React.Fragment>
  );
}

export default AppWrapper;
