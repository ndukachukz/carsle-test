import { useCall } from "../hooks/useCall";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "./ui/button";

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

  return (
    <div>
      {!activeCall ? (
        <>
          <Button onClick={handleStartCall}>Start Call</Button>
        </>
      ) : (
        <div>
          <video ref={remoteVideoRef} className="w-full h-1/2" />
          <video ref={currentUserVideoRef} className="w-full h-1/2" muted />

          <Button onClick={endCall}>End Call</Button>
        </div>
      )}
    </div>
  );
}
