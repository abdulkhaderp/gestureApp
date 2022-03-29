import React, { Component } from "react";
import { Link } from "react-router-dom";
import RecorderControls from "../voice-recorder/recorder-controls"
import RecordingsList from "../voice-recorder/recordings-list";
import useRecorder from "../voice-recorder/hooks/useRecorder";
import "../App.css";
export default function Recorder() {
  const { recorderState, ...handlers } = useRecorder();
  const { audio } = recorderState;
  return (
    <div>
      Login Page
      <Link to="/home"> Go to Home </Link>
      <section className="voice-recorder">
        <h1 className="title">Voice Recorder</h1>
        <div className="recorder-container">
          <RecorderControls recorderState={recorderState} handlers={handlers} />
          <RecordingsList audio={audio} />
        </div>
      </section>
    </div>
  );
}
