import { useCall } from "../hooks/useCall";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "./ui/button";
import { useEffect } from "react";

export default function Call({ receiverId }: { receiverId: string }) {
  const { user: currentUser } = useAuth();

  const {
    activeCall,
    startCall,
    endCall,
    remoteVideoRef,
    currentUserVideoRef,
  } = useCall(currentUser);

  const handleStartCall = () => {
    startCall(receiverId);
  };

  useEffect(() => {
    if (remoteVideoRef.current && currentUserVideoRef.current) {
      console.log(remoteVideoRef.current);
      console.log(currentUserVideoRef.current);
    }
  }, [currentUserVideoRef.current, remoteVideoRef.current]);

  return (
    <div>
      {!activeCall ? (
        <>
          <Button onClick={handleStartCall}>Start Call</Button>
        </>
      ) : (
        <div>
          <h1>Current user id is {}</h1>

          <div>
            <video ref={remoteVideoRef} className="w-full h-1/2" />
          </div>

          <div>
            <video ref={currentUserVideoRef} className="w-full h-1/2" />
          </div>

          <Button onClick={endCall}>End Call</Button>
        </div>
      )}
    </div>
  );
}
