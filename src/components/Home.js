import React from "react";
import "../App.css";
import Header from "./Header";

export default function Home() {
    return (
        
        <>  <Header></Header>
        
            <div className="container">

            <div className="row menu-block">

                <div className="col-6"></div>

                <div className="col-1">

                    <a href="#"><i className='fas fa-plus font-size-36px'></i></a>

                </div>

                <div className="col-1"><a href="#"><i className='far fa-smile font-size-36px'></i></a></div>

                <div className="col-1">

                    <a href="#"><i className='fas fa-heart font-size-36px'></i></a>

                </div>

            </div>

            <div className="col-2"></div>



        </div><div className="container">

                <div className="row margin-top-40px">

                    <div className="col-12 p-3 cell-boarder">&nbsp;</div>

                </div>

                <div className="row">

                    <div className="col-12 p-3 cell-boarder">&nbsp;</div>

                </div>

                <div className="row">

                    <div className="col-12 p-3 cell-boarder">&nbsp;</div>

                </div>

                <div className="row">

                    <div className="col-12 p-3 cell-boarder">&nbsp;</div>

                </div>

            </div></>

);
}
