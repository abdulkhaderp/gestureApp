import React, { useState, useRef } from "react";
import "../App.css";
import { useHistory } from "react-router-dom";

export default function Login() {
  const history = useHistory();
  const myForm = useRef({})

  const [loginData, setLoginData] = useState({ userName: "", password: "" })

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value })
  }
  const onLoginSubmit = () => {
    console.log(loginData);
    history.push("/home");
  }

  return (
    <div className="bg-login">
      <h3 className="text-center mt-5 text-white"><i className="speak-icon"></i><strong>Speak Easy</strong></h3>
      <div class="card fixed-bottom shadow login-card">
        <div className="card-body p-4 p-sm-5 ">
          <h3 className="card-title mb-4">Login</h3>
          <form onSubmit={onLoginSubmit} ref={myForm}>
            <div className="form-floating mb-3">
              <input type="text" name="userName" onChange={handleChange} className="form-control" id="floatingInput" placeholder="Enter username" required />
              <label for="floatingInput">User Name</label>
            </div>
            <div className="form-floating mb-3">
              <input type="text" name="password" onChange={handleChange} className="form-control" id="floatingPassword" placeholder="Enter Password" required />
              <label for="floatingPassword">Password</label>
            </div>
            <div className="d-grid">
              <button type="submit" className="btn btn-primary btn-login fw-bold">Submit</button>
              <button type="reset" className="btn btn-outline-primary fw-bold mt-2">Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
