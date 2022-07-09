import React, { useRef, useState, useEffect } from "react";
import "../App.css";
import Header from "./Header";
import _Home from './../components/_Home';
import Speak from "./Speak";
import { gestureData } from '../config';
import { useSpeechSynthesis } from 'react-speech-kit';


export default function Home() {
    const {speak} = useSpeechSynthesis();
    const [listView, setListView] = useState(false);
    const [addGesture, setaddGesture] = useState(false);
    const [speakMode, setSpeakMode] = useState(true);
    const [GestureMessage, setGestureMessage] = useState({ message: ""})
    const [qSet, setQSet] = useState([]);

    const handleAddGesture = () => {
        setSpeakMode(false);
        setaddGesture(true);
        setListView(false);

    }

    const handleSpeak =()=>{
         setaddGesture(false);
        setSpeakMode(true);
        setListView(false);
    }

    const handleChange = (e) => {
        setGestureMessage({ ...GestureMessage, [e.target.name]: e.target.value })
      }
      const onSubmit = () => {
        console.log(GestureMessage);
      }

    const showList =()=>{
        setListView(true);
        setSpeakMode(false);
        setaddGesture(false);
        //just fetch all qstn from local storage
        let ar=[];
        Object.keys(gestureData).forEach((i)=>{
            ar.push(gestureData[i]);
        })
        let qstns=[];
        ar.forEach((q)=>{
            if(localStorage.getItem(q)){
                qstns.push(localStorage.getItem(q));
            }
        })
        setQSet(qstns);

    }  

    const playQstn =(i)=>{
        console.log(i);
        speak({text:i})
    }

    return (
        <>
            <Header></Header>
            <div className="container p-4">
                <div className="d-flex justify-content-around">
                    <button type="button" onClick={handleSpeak}  class="btn btn-dark"><i className="fas fa-heart"></i></button>
                    <button type="button" onClick={handleAddGesture} class="btn btn-primary"><i className="fas fa-plus"></i></button>
                    <button type="button" onClick={showList} class="btn btn-success"><i className="fas fa-list"></i></button>
                </div>
            </div>
            <hr />
            <div className="container">
                {addGesture && <><div className="row justify-content-center">
                    <div className="col-12">
                        <div class="container-fluid">
                            <_Home></_Home>
                        </div>
                    </div>
                    <div className="col-8 p-4">
                        <div class="form-group">
                            <textarea class="form-control" name="message" onChange={handleChange} placeholder="Enter your Message" rows="3"></textarea>
                        </div>
                    </div>

                </div>
                    <div className="row justify-content-center">
                        <div className="col-6 text-center">
                            <button type="button" onClick={onSubmit} class="btn btn-success"><i className="fas fa-save"></i> Save</button>
                        </div>
                    </div>
                </>}

                { speakMode && <><div className="row justify-content-center">
                    <div className="col-12">
                        <h5>Speak Page- title to be removed</h5>
                        <div class="container-fluid">
                            <Speak></Speak>
                        </div>
                    </div>
                    

                </div>
                    
                </>}

                {
                    listView && <><div className="row justify-content-center">
                    <div className="col-12">
                        <h5>List Page- title to be removed</h5>
                        <div class="container-fluid">
                            {qSet.map((i)=>{
                                return (
                                    <><li>{i}</li> <input type="button" value="play" onClick={()=> playQstn(i)}></input></>
                                )
                            })}
                        </div>
                    </div>
                    

                </div>
                    
                </>
                }
            </div>
        </>

    );
}
