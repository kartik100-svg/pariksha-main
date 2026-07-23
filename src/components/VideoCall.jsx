import { useEffect, useRef } from "react";

function VideoCall({ roomId, role, socketRef }) {
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const peerRef = useRef(null);
  const localStreamRef = useRef(null);
  const offerSentRef = useRef(false);
  const pendingCandidatesRef = useRef([]);

  const createPeer = () => {
    const peer = new RTCPeerConnection({
      iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
    });

    localStreamRef.current.getTracks().forEach((track) => {
      peer.addTrack(track, localStreamRef.current);
    });

    peer.ontrack = (event) => {
      if (remoteVideoRef.current) {
        remoteVideoRef.current.srcObject = event.streams[0];
      }
    };

    peer.onicecandidate = (event) => {
      if (event.candidate) {
        socketRef.current?.emit("webrtc-ice-candidate", {
          roomId,
          candidate: event.candidate,
        });
      }
    };

    peerRef.current = peer;
    return peer;
  };

  const sendOffer = async () => {
    if (role !== "student") return;
    if (offerSentRef.current) return;
    if (!localStreamRef.current) return;

    offerSentRef.current = true;

    const peer = peerRef.current || createPeer();

    const offer = await peer.createOffer();
    await peer.setLocalDescription(offer);

    socketRef.current?.emit("webrtc-offer", {
      roomId,
      offer,
    });
  };

  useEffect(() => {
    const socket = socketRef.current;
    if (!socket) return;

    const start = async () => {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });

      localStreamRef.current = stream;

      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
      }

      createPeer();
    };

    start();

    socket.on("presence-update", async (presence) => {
      if (presence.student && presence.interviewer) {
        await sendOffer();
      }
    });

    socket.on("webrtc-offer", async ({ offer }) => {
      if (role !== "interviewer") return;

      const peer = peerRef.current || createPeer();

      await peer.setRemoteDescription(new RTCSessionDescription(offer));

      const answer = await peer.createAnswer();
      await peer.setLocalDescription(answer);

      socket.emit("webrtc-answer", {
        roomId,
        answer,
      });

      for (const candidate of pendingCandidatesRef.current) {
        await peer.addIceCandidate(new RTCIceCandidate(candidate));
      }

      pendingCandidatesRef.current = [];
    });

    socket.on("webrtc-answer", async ({ answer }) => {
      if (role !== "student") return;
      if (!peerRef.current) return;

      await peerRef.current.setRemoteDescription(
        new RTCSessionDescription(answer)
      );

      for (const candidate of pendingCandidatesRef.current) {
        await peerRef.current.addIceCandidate(new RTCIceCandidate(candidate));
      }

      pendingCandidatesRef.current = [];
    });

    socket.on("webrtc-ice-candidate", async ({ candidate }) => {
      try {
        if (!peerRef.current || !peerRef.current.remoteDescription) {
          pendingCandidatesRef.current.push(candidate);
          return;
        }

        await peerRef.current.addIceCandidate(
          new RTCIceCandidate(candidate)
        );
      } catch (error) {
        console.log("ICE error:", error);
      }
    });

    return () => {
      socket.off("presence-update");
      socket.off("webrtc-offer");
      socket.off("webrtc-answer");
      socket.off("webrtc-ice-candidate");

      localStreamRef.current?.getTracks().forEach((track) => track.stop());
      peerRef.current?.close();
    };
  }, [roomId, role, socketRef]);

  return (
    <div className="video-call-box">
      <video
        ref={localVideoRef}
        autoPlay
        muted
        playsInline
        className="call-video"
      />

      <video
        ref={remoteVideoRef}
        autoPlay
        playsInline
        className="call-video"
      />
    </div>
  );
}

export default VideoCall;