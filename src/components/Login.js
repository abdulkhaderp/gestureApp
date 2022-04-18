import React, { useState } from "react";
import "../App.css";
import { useHistory } from "react-router-dom";

export default function Login() {
  const history = useHistory();
  const [loginData, setLoginData] = useState({ userName: "", password: "" })

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value })
  }
  const onLoginSubmit = () => {
    console.log(loginData);
    history.push("/home");
  }

  return (
    <form className="overflow-hidden" onSubmit={onLoginSubmit}>
      <div className="row ">
        <div className="col-sm-6 col-md-4 col-lg-4 mx-auto mt-5">
          <div className="card border-0 shadow rounded-3 my-5">
            <div className="card-body p-4 p-sm-5">
              <h5 className="card-title text-center mb-5 fw-light fs-5">Sign In</h5>
              <form>
                <div className="form-floating mb-3">
                  <input type="text" name="userName" onChange={handleChange} className="form-control" id="floatingInput" placeholder="Enter username" required />
                  <label for="floatingInput">User Name</label>
                </div>
                <div className="form-floating mb-3">
                  <input type="text" name="password" onChange={handleChange} className="form-control" id="floatingPassword" placeholder="Enter Password" required />
                  <label for="floatingPassword">Password</label>
                </div>
                <div className="d-grid">
                  <button type="submit" className="btn btn-primary btn-login text-uppercase fw-bold">Sign
                    in</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </form>
  )
}
