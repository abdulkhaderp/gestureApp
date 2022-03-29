import React, { Component } from 'react'
import {Link} from "react-router-dom";

export default class Login extends Component {
  render() {
    return (
      <div>Login Page
      
      <div>
      <Link to="/home"> Go to Home </Link>
      </div>
      <div>
      <Link to="/textToSpeech">Text To Speech</Link>
      </div>
      </div>
    )
  }
}
