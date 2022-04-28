import React, { Component } from "react";
import "../App.css";

class Header extends Component {
  render(){
      return(
        <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
        <div className="container-fluid">
          <div className="row header-row">
            <div className="col-10">
              <h1 className="header-app-name">App Name</h1>
            </div>
  
            <div className="col-1">
              <a className="navbar-brand" href="#">
                <i className="fas fa-user-circle header-user-circle"></i>
              </a>
            </div>
  
            <div className="col-1">
              <button
                className="navbar-toggler"
                style={{display: "inline"}}
                type="button"
                aria-controls="navbarToggleExternalContent"
                aria-expanded="false"
                aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
            </div>
          </div>
        </div>
      </nav>
      );
  }
}
export default Header;
