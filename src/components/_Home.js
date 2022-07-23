
import React, { useRef, useState, useEffect } from "react";
import * as tf from "@tensorflow/tfjs";
import * as handpose from "@tensorflow-models/handpose";
import Webcam from "react-webcam";
import { Link } from "react-router-dom";

import { loveYouGesture } from "../gestures/LoveYou";
import { fullCloseGesture } from "../gestures/FullClose";
import { fullOpenGesture } from "../gestures/FullOpen";

import * as fp from "fingerpose";

import { gestureData } from '../config';

function _Home({ showList,close,openAlert }) {
  const webcamRef = useRef(null);

  const [camStarted, setCamStarted] = useState(true);
  const [recognisedGesture, setRecognisedGesture] = useState("")
  const [isTraining, setIsTraining] = useState(true);
  const [GestureMessage, setGestureMessage] = useState({ message: "" })


  const [gestureName, setGestureName] = useState("");

  const runHandpose = async () => {
    const net = await handpose.load();
    setInterval(() => {
      detect(net);
    }, 1000);
  };

  const detect = async (net) => {
    // Check data is available
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      // Get Video Properties
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      // Set video width
      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      // Make Detections
      const hand = await net.estimateHands(video);


      if (hand.length > 0) {
        const GE = new fp.GestureEstimator([
          fp.Gestures.VictoryGesture,
          fp.Gestures.ThumbsUpGesture,
          loveYouGesture,
          fullCloseGesture,
          fullOpenGesture
        ]);
        const gesture = await GE.estimate(hand[0].landmarks, 4);
        if (gesture.gestures !== undefined && gesture.gestures.length > 0) {
          console.log(gesture.gestures);

          const confidence = gesture.gestures.map(
            (prediction) => prediction.confidence
          );
          const maxConfidence = confidence.indexOf(
            Math.max.apply(null, confidence)
          );
          // console.log(confidence)
          let matchWithHighScore = (Math.max(...confidence))
          // console.log(gesture.gestures[maxConfidence].name);
          let result = gesture.gestures.filter(obj => {
            return obj.confidence === matchWithHighScore
          })
          //console.log(result[0]);
          if (matchWithHighScore > 7) {
            setCamStarted(false)
            setRecognisedGesture(result[0].name);
            setGestureName(result[0].name);
            // When training :
            // if (isTraining)
            //   saveUserGesture(result[0].name);
            // When using :
            // retrieveUserGesture()
          }

        }
      }
    }
  };
  // const saveUserGesture = (name) => {
  //   console.log(gestureData);
  //   console.log(name);
  //   localStorage.setItem(gestureData[name], "Hiye, sample question!")
  // }
  useEffect(() => { runHandpose() }, []);

  const handleChange = (e) => {
    setGestureMessage({ ...GestureMessage, [e.target.name]: e.target.value })
  }

  const onSubmit = () => {
    console.log(gestureName);
    console.log(GestureMessage.message);
    localStorage.setItem(gestureData[gestureName], GestureMessage.message);
    openAlert();
    showList()
  }

  const closeAlert=()=>{
    close();
  }

  
  const reset = () => {
    setCamStarted(true)
    setGestureMessage("");
    setRecognisedGesture("");
    setGestureName("");
  }

  return (
    <>
      <div >
        <div>

          {recognisedGesture && <>
            <div className="col-12">
              <div class="form-group pb-3">
                <label>Gesture is {recognisedGesture}</label>
                <textarea class="form-control" name="message" onChange={handleChange} placeholder="Enter your command" rows="3"></textarea>
              </div>
              <button type="button" onClick={onSubmit} class="w-100 btn btn-lg btn-primary mb-2">Save</button>
              <button type="button" onClick={reset} class="w-100 btn btn-lg btn-outline-primary">Cancel</button>
            </div>
          </>

          }

        </div>

        {
          camStarted ?
            <>
              <small><strong>Show your gesture against camera</strong></small>

              <div className="text-center"><Webcam r ref={webcamRef}
                style={{
                  // position: "absolute",
                  marginLeft: "auto",
                  marginRight: "auto",
                  left: 0,
                  right: 0,
                  textAlign: "center",
                  zindex: 9,
                  width: 640,
                  height: 480,
                }} />
                <button class="btn btn-primary mt-2" type="button" disabled>
                  <span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
                  <span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
                  <span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
                  &nbsp;Capturing...
                </button>
              </div>
              <div className="text-center pt-4">
                <button type="button" class="btn btn-danger" onClick={() => setCamStarted(false)}><i class="fa fa-stop"></i></button>
              </div></> :
            <div className="text-center pt-4">
              {!recognisedGesture && <button type="button" class="btn btn-primary" onClick={() => setCamStarted(true)}><i class="fa fa-play"></i> Start</button>}
            </div>

        }

      </div>
    </>
  );
}

export default _Home;
