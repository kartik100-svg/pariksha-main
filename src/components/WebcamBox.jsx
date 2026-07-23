import { useRef, useState } from "react";
import "@tensorflow/tfjs";
import * as cocoSsd from "@tensorflow-models/coco-ssd";

function WebcamBox() {
  const videoRef = useRef(null);

  const [personStatus, setPersonStatus] = useState("Camera not started");
  const [cameraOn, setCameraOn] = useState(false);

  const modelRef = useRef(null);
  const streamRef = useRef(null);
  const animRef = useRef(null);

  const startCamera = async () => {
    try {
      setPersonStatus("Starting camera...");

      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });

      streamRef.current = stream;
      setCameraOn(true);

      videoRef.current.srcObject = stream;
      await videoRef.current.play();

      setPersonStatus("Loading detection model...");

      if (!modelRef.current) {
        modelRef.current = await cocoSsd.load();
      }

      setPersonStatus("Scanning...");

      const detect = async () => {
        if (!modelRef.current || !videoRef.current || !cameraOn) return;

        const predictions = await modelRef.current.detect(videoRef.current);
        const people = predictions.filter((p) => p.class === "person");

        setPersonStatus(
          people.length > 0
            ? `✓ ${people.length} person(s) detected`
            : "⚠ No person detected"
        );

        animRef.current = requestAnimationFrame(detect);
      };

      animRef.current = requestAnimationFrame(detect);
    } catch (error) {
      console.error("Camera error:", error);
      setPersonStatus("Camera permission denied");
      setCameraOn(false);
    }
  };

  const stopCamera = () => {
    if (animRef.current) {
      cancelAnimationFrame(animRef.current);
      animRef.current = null;
    }

    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }

    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }

    setCameraOn(false);
    setPersonStatus("Camera stopped");
  };

  return (
    <div className="webcam-box">
      <h3>Live Webcam</h3>

      <div className="webcam-actions">
        {!cameraOn ? (
          <button className="webcam-btn start" onClick={startCamera}>
            Start Webcam
          </button>
        ) : (
          <button className="webcam-btn stop" onClick={stopCamera}>
            Stop Webcam
          </button>
        )}
      </div>

      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className="webcam-video"
      />

      <p className="webcam-status">{personStatus}</p>
    </div>
  );
}

export default WebcamBox;