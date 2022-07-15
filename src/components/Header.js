import React, { Component } from "react";
import "../App.css";
import { Link } from "react-router-dom";


class Header extends Component {

  render() {
    return (
      <div className="d-flex justify-content-between text-white p-3">
        <div><b><i class="fa fa-solid fa-bars"></i>&nbsp;&nbsp;Speak Easy</b></div>
        <Link to="/login"><div className="text-white"><b><i class="fas fa-sign-out-alt"></i></b></div></Link>
      </div>
    );
  }
}
export default Header;
