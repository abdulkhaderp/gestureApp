import React, { useRef, useState, useEffect } from "react";
import "../App.css";
import Header from "./Header";
import _Home from './../components/_Home';

export default function Home() {

    const [addGesture, setaddGesture] = useState(false);
    const [GestureMessage, setGestureMessage] = useState({ message: ""})

    const handleAddGesture = () => {
        setaddGesture(true)
    }

    const handleChange = (e) => {
        setGestureMessage({ ...GestureMessage, [e.target.name]: e.target.value })
      }
      const onSubmit = () => {
        console.log(GestureMessage);
      }

    return (
        <>
            <Header></Header>
            <div className="container p-4">
                <div className="d-flex justify-content-around">
                    <button type="button" onClick={handleAddGesture} class="btn btn-primary"><i className="fas fa-plus"></i></button>
                    <button type="button" class="btn btn-dark"><i className="fas fa-heart"></i></button>
                    <button type="button" class="btn btn-success"><i className="fas fa-list"></i></button>
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

            </div>
        </>

    );
}
