import React, { Component } from 'react'
import {Link} from "react-router-dom";
import "../App.css";
export default function Login() {
    return (
      <div>Login Page
      <Link to="/home"> Go to Home </Link><br/>
      <Link to="/recorder"> Go to Recorder </Link>
      </div>
    )
}
