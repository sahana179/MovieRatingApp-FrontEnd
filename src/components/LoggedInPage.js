import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import App from "./App";
import configureStore from "../redux/configureStore";
import { Provider as ReduxProvider } from "react-redux";
import LoginPage from "./login/LoginPage";
import useAuth from "./common/use-auth";
const store = configureStore();

const LoggedInPage = () => {
  let auth = useAuth();

  return auth.user ? (
    <>
      <ReduxProvider store={store}>
        <Router>
          <App />
        </Router>
      </ReduxProvider>
    </>
  ) : (
    <div className="container-fluid">
      <header>
        <nav className="navbar navbar-expand-lg navbar-light bg-white fixed-top center"></nav>
      </header>
      <div
        className="p-5 text-center bg-light"
        style={{ marginTop: 58 + "px" }}
      >
        <LoginPage />
      </div>
    </div>
  );
};

export default LoggedInPage;
