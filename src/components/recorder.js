import React, { Component, useState } from "react";
import { Link } from "react-router-dom";
import RecorderControls from "../voice-recorder/recorder-controls"
import RecordingsList from "../voice-recorder/recordings-list";
import useRecorder from "../voice-recorder/hooks/useRecorder";
import localforage from "localforage";
import "../App.css";
export default function Recorder() {
  const { recorderState, ...handlers } = useRecorder();
  const { audio } = recorderState;
  const [aud, setAud]=useState("");
  const save=()=>{
    console.log(recorderState);
    localforage.setItem('someaudio', recorderState.test).then(function (value) {
      // Do other things once the value has been saved.
      console.log(value);
  }).catch(function(err) {
      // This code runs if there were any errors
      console.log(err);
  });
  }

  const get = ()=>{
    localforage.getItem('someaudio').then(function (value) {
      // Do other things once the value has been saved.
      console.log(value);
      setAud(window.URL.createObjectURL(value));
      let a=document.getElementsByTagName("audio")[0]
      a.play()
  }).catch(function(err) {
      // This code runs if there were any errors
      console.log(err);
  });
  }
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

        <input type="button" value="save voice" onClick={save}></input>
        <input type="button" value="get voice" onClick={get}></input>
        <br></br>
        <audio controls="" src={aud}></audio>
      </section>
    </div>
  );
}
