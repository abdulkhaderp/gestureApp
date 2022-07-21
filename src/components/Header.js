import React, { Component } from "react";
import "../App.css";
import { Link } from "react-router-dom";


export default function Header({handleSpeak}) {

const goToHome=()=>{
  handleSpeak()
}

  return (
      <div className="d-flex justify-content-between text-white p-3">
        <div onClick={goToHome}><b><i class="fa fa-solid fa-bars"></i>&nbsp;&nbsp;Speak Easy</b></div>
        <Link to="/login"><div className="text-white"><b><i class="fas fa-sign-out-alt"></i></b></div></Link>
      </div>
    );
  
}
