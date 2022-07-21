import React, { useRef, useState, useEffect } from "react";
import "../App.css";
import Header from "./Header";
import _Home from './../components/_Home';
import Speak from "./Speak";
import { gestureData } from '../config';
import { useSpeechSynthesis } from 'react-speech-kit';


export default function Home() {
    const { speak } = useSpeechSynthesis();
    const [listView, setListView] = useState(false);
    const [addGesture, setaddGesture] = useState(false);
    const [speakMode, setSpeakMode] = useState(true);
    const [qSet, setQSet] = useState([]);

    const handleAddGesture = () => {
        setSpeakMode(false);
        setaddGesture(true);
        setListView(false);

    }

    const handleSpeak = () => {
        setaddGesture(false);
        setSpeakMode(true);
        setListView(false);
    }



    const showList = () => {
        setListView(true);
        setSpeakMode(false);
        setaddGesture(false);
        //just fetch all qstn from local storage
        let ar = [];
        Object.keys(gestureData).forEach((i) => {
            ar.push(gestureData[i]);
        })
        let qstns = [];
        ar.forEach((q) => {
            if (localStorage.getItem(q)) {
                qstns.push(localStorage.getItem(q));
            }
        })
        setQSet(qstns);

    }

    const playQstn = (i) => {
        console.log(i);
        speak({ text: i })
    }

    return (
        <>
            <div className="bg-login">
                <Header handleSpeak={handleSpeak}></Header>

                <div class="card h-100 home-card">
                    <div class="card-body">
                        <div className="d-flex justify-content-around mt-4 pb-4">
                            <div className="d-flex flex-column" onClick={handleSpeak}>
                                <div className={`card home-card ${speakMode && 'border-box'}`}>
                                    <div class="card-body pr-5"><i className="voice-icon"></i>
                                    </div>
                                </div>
                                <p className="text-center">Speak</p>
                            </div>
                            <div className="d-flex flex-column" onClick={handleAddGesture}>
                                <div className={`card home-card ${addGesture && 'border-box'}`}>
                                    <div class="card-body pr-5"><i className="record-icon"></i>
                                    </div>
                                </div>
                                <p className="text-center">Record</p>
                            </div>

                            <div className="d-flex flex-column" onClick={showList}>
                                <div className={`card home-card ${listView && 'border-box'}`}>
                                    <div class="card-body pr-5"><i className="list-icon"></i>
                                    </div>
                                </div>
                                <p className="text-center">List</p>
                            </div>
                        </div>
                        <div className="container mt-4">
                            {addGesture && <><div className="row justify-content-center">
                                <_Home showList={showList}></_Home>
                            </div>
                            </>}

                            {speakMode && <><div className="row justify-content-start">
                                <div className="col-md-12">
                                    <Speak handleAddGesture={handleAddGesture}></Speak>
                                </div>


                            </div>

                            </>}

                            {
                                listView && <><div className="row justify-content-center">
                                    <div className="col-12">
                                        {qSet.length?qSet.map((i) => {
                                            return (
                                                <>

                                                    <div class="card mt-2">
                                                        <div class="card-body d-flex justify-content-start">
                                                            <a onClick={() => playQstn(i)}><i class="fa fa-play-circle text-warning fa-2x" aria-hidden="true"></i>
                                                            </a>
                                                            <div className="mt-1">&nbsp;&nbsp;{i}</div>
                                                        </div>
                                                    </div>
                                                </>
                                            )
                                        }):<div className="text-center">No data to display</div>}
                                    </div>


                                </div>

                                </>
                            }
                        </div>
                    </div>
                </div>

            </div>
        </>

    );
}
