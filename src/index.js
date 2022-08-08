import React from "react";
import { render } from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "jquery/dist/jquery.min.js";
import "bootstrap/dist/js/bootstrap.min.js";
import "./index.css";
import configureStore from "./redux/configureStore";
import { Provider as ReduxProvider } from "react-redux";
import LoginPage from "./components/login/LoginPage";
import { ProvideAuth } from "./components/common/use-auth";
const store = configureStore();
import LoggedInPage from "./components/LoggedInPage";

//first initial page

render(
  <ProvideAuth>
    <LoggedInPage />
  </ProvideAuth>,
  document.getElementById("app")
);
