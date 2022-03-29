import React, { Component } from 'react'
import {Link} from "react-router-dom";
import "../App.css";
export default function Login() {
    return (
      <div>Login Page
      
      <div>
      <Link to="/home"> Go to Home </Link>
      </div>
      <div>
      <Link to="/textToSpeech">Text To Speech</Link>
      </div>
      <div>
      <Link to="/recorder"> Go to Recorder </Link>
      </div>
      </div>
    )
}
