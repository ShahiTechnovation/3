import React, { useRef, useState, useEffect } from "react";
import WaveSurfer from "wavesurfer.js";

const MusicVisualizer = () => {
  // State to hold the audio file
  const [audioFile, setAudioFile] = useState(null);
  const [waveformLoaded, setWaveformLoaded] = useState(false);

  // Reference to the WaveSurfer container div
  const waveformRef = useRef(null);

  // Reference to the WaveSurfer instance
  const wavesurfer = useRef(null);

  // Handle file selection
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setAudioFile(file);
    }
  };

  // Initialize WaveSurfer when the component mounts or when the audio file changes
  useEffect(() => {
    if (audioFile) {
      // Initialize WaveSurfer instance
      wavesurfer.current = WaveSurfer.create({
        container: waveformRef.current,
        waveColor: "violet", // Color of the waveform
        progressColor: "purple", // Color of the progress bar
        height: 200, // Height of the waveform
        barWidth: 2, // Width of the waveform bars
      });

      // Load the audio file into WaveSurfer
      const objectUrl = URL.createObjectURL(audioFile);
      wavesurfer.current.load(objectUrl);

      // When the waveform is ready, set the loaded state
      wavesurfer.current.on("ready", () => {
        setWaveformLoaded(true);
      });

      // Clean up the WaveSurfer instance when the component is unmounted
      return () => {
        if (wavesurfer.current) {
          wavesurfer.current.destroy();
        }
      };
    }
  }, [audioFile]); // Re-run when audioFile changes

  return (
    <div>
      {/* File upload input */}
      <input
        type="file"
        accept="audio/*"
        onChange={handleFileChange}
        style={{ marginBottom: "20px" }}
      />

      {/* Show a loading message or the waveform */}
      {audioFile && !waveformLoaded ? (
        <p>Loading waveform...</p>
      ) : (
        <div ref={waveformRef} style={{ width: "100%" }}></div>
      )}

      {/* Optional: Play/Pause button */}
      <button
        onClick={() => {
          if (wavesurfer.current) {
            if (wavesurfer.current.isPlaying()) {
              wavesurfer.current.pause();
            } else {
              wavesurfer.current.play();
            }
          }
        }}
      >
        {wavesurfer.current && wavesurfer.current.isPlaying() ? "Pause" : "Play"}
      </button>
    </div>
  );
};

export default MusicVisualizer;
