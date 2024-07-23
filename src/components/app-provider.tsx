import React, { useEffect } from "react";
import { useAppStore } from "@/store/app-store";
import { useAuth } from "@/hooks/useAuth";
import { peerService } from "@/lib/services/peer";
import { useCall } from "@/hooks/useCall";
import CallDialog from "./call-dialog";

function AppProvider({ children }: { children: React.ReactNode }) {
  const { signIn, user } = useAuth();
  const { remoteVideoRef, currentUserVideoRef } = useCall(user);

  const setPeer = useAppStore((store) => store.setPeer);
  const setPeerId = useAppStore((store) => store.setPeerId);

  useEffect(() => {
    signIn();

    if (!user) return;

    const peer = peerService.initialize(user.id);

    peer.on("open", (id) => {
      console.log(id);
      setPeerId(id);
      setPeer(peer);
    });

    peer.on("call", async (call) => {
      peerService.answer(call, (mediaStream) => {
        if (currentUserVideoRef.current) {
          currentUserVideoRef.current.srcObject = mediaStream;
          currentUserVideoRef.current.play();
        }

        call.on("stream", (remoteStream) => {
          if (remoteVideoRef.current) {
            remoteVideoRef.current.srcObject = remoteStream;
            remoteVideoRef.current.play();
          }
        });
      });
    });
  }, []);

  return (
    <>
      {children}

      <CallDialog />
    </>
  );
}

export default AppProvider;
