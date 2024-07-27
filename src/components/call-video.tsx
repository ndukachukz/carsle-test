import { usePeerStore } from "@/store/peer-store";
import { useEffect, useRef } from "react";

export default function CallVideo() {
  const { currentVideo, remoteVideo } = usePeerStore((store) => ({
    currentVideo: store.currentVideo,
    remoteVideo: store.remoteVideo,
  }));

  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const currentUserVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (currentUserVideoRef.current && currentVideo) {
      currentUserVideoRef.current.srcObject = currentVideo;
    }
  }, [currentVideo, currentUserVideoRef]);

  useEffect(() => {
    if (remoteVideoRef.current && remoteVideo) {
      remoteVideoRef.current.srcObject = remoteVideo;
    }
  }, [remoteVideo, remoteVideoRef]);

  return (
    <div className="md:flex gap-3">
      {remoteVideo && (
        <video
          ref={remoteVideoRef}
          className="w-full md:w-1/2"
          autoPlay
          playsInline
        />
      )}

      {currentVideo && (
        <video
          ref={currentUserVideoRef}
          className="w-full md:w-1/2"
          autoPlay
          playsInline
          muted
        />
      )}
    </div>
  );
}
