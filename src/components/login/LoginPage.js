import React, { useContext, createContext, useState } from "react";
//import { useNavigate } from "react-router-dom";

import useAuth from "../common/use-auth";

const LoginPage = () => {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();
  let auth = useAuth();
  let login = () => {
    console.log(username, password);
    auth.signin(username, password);
    if (auth.username) {
      // navigate("/", { replace: true });
    }
  };
  const handleEmailChange = (e) => {
    setUserName(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  return (
    <>
      <h1>Welcome to Movie Rating App</h1>
      <form>
        <div className="form-outline mb-4">
          <input
            type="email"
            id="form2Example1"
            className="form-control"
            onChange={handleEmailChange}
          />
          <label className="form-label" htmlFor="form2Example1">
            Email address
          </label>
        </div>

        <div className="form-outline mb-4">
          <input
            type="password"
            id="form2Example2"
            className="form-control"
            onChange={handlePasswordChange}
          />
          <label className="form-label" htmlFor="form2Example2">
            Password
          </label>
        </div>

        <div className="row mb-4">
          <div className="col d-flex justify-content-center">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="form2Example31"
              />
              <label className="form-check-label" htmlFor="form2Example31">
                {" "}
                Remember me{" "}
              </label>
            </div>
          </div>

          <div className="col">
            <a href="#!">Forgot password?</a>
          </div>
        </div>

        <button
          type="button"
          onClick={login}
          className="btn btn-primary btn-block mb-4"
        >
          Sign in
        </button>

        <div className="text-center">
          <p>
            Not a member? <a href="#!">Register</a>
          </p>
          <p>or sign up with:</p>
          <button type="button" className="btn btn-link btn-floating mx-1">
            <i className="fab fa-facebook-f"></i>
          </button>

          <button type="button" className="btn btn-link btn-floating mx-1">
            <i className="fab fa-google"></i>
          </button>

          <button type="button" className="btn btn-link btn-floating mx-1">
            <i className="fab fa-twitter"></i>
          </button>

          <button
            type="button"
            onClick={login}
            className="btn btn-link btn-floating mx-1"
          >
            <i className="fab fa-github"></i>
          </button>
        </div>
      </form>
    </>
  );
};

export default LoginPage;
