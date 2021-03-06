
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
import { useSpeechSynthesis } from 'react-speech-kit';


function Speak({ handleAddGesture }) {
  const webcamRef = useRef(null);

  const { speak } = useSpeechSynthesis();
  const [camStarted, setCamStarted] = useState(true);
  const [recognisedGesture, setRecognisedGesture] = useState("")
  const [isTraining, setIsTraining] = useState(true);
  const [qstn, setQstn] = useState("");
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
            let q = localStorage.getItem(gestureData[result[0].name]);
            setQstn(q);
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

  useEffect(() => { runHandpose() }, []);
  useEffect(() => {
    if (recognisedGesture && qstn) {
      playAudio();
    }

  }, [recognisedGesture, qstn]);


  const playAudio = () => {
    speak({ text: qstn })
  }

  const reset = () => {
    setCamStarted(true);
    setRecognisedGesture("");
    setQstn("")
  }

  const goToRecord = () => {
    handleAddGesture()
  }
  return (
    <>
      <div className="row">
        <div className="col-12">
          {(recognisedGesture && qstn) ?
            <>
              <label>{'Gesture is ' + recognisedGesture}</label>
              <textarea placeholder="Enter your command" value={qstn} rows="3" readOnly={qstn}>{qstn}</textarea>
              <button className='w-100 btn btn-lg btn-primary' type="button" onClick={playAudio}>Play Again</button>
              <button className='w-100 btn btn-lg btn-outline-primary mt-2' type="button" onClick={reset}>Cancel</button>
            </> :
            <div>
             {recognisedGesture&& 
             <div>
              <label>{'Gesture is ' + recognisedGesture}</label>
              <button className='w-100 btn btn-lg btn-outline-primary mt-2' type="button" onClick={goToRecord}>ADD COMMAND</button>
             </div>
             }
            </div>

          }
        </div>

        {
          camStarted ?
            <div className="text-center">
              <small><strong>Show your gesture against camera</strong></small>
              <Webcam
                ref={webcamRef}
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
                }}
              />
              <button class="btn btn-primary mt-2" type="button" disabled>
                <span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
                <span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
                <span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
                &nbsp;Processing...
              </button>
            </div> : null
        }
      </div>
    </>
  );
}

export default Speak;
