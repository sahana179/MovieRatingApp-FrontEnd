import React from "react";
import {
  Route,
  Switch,
  Router,
  Link,
  useRouteMatch,
  useParams,
} from "react-router-dom";
import HomePage from "./home/HomePage";
import Header from "./common/Header";
import PageNotFound from "./PageNotFound";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MoviesPage from "./movies/MoviesPage";
import ManageMoviePage from "./movies/ManageMoviePage";
import LogoutPage from "./logout/LogoutPage";
function App() {
  return (
    <div className="container-fluid">
      <Header />
      <Switch>
        <Route exact path="/" component={HomePage}></Route>
        <Route exact path="/movies" component={MoviesPage}></Route>
        <Route exact path="/movie/:id" component={ManageMoviePage}></Route>
        <Route exact path="/logout" component={LogoutPage}></Route>
        <Route component={PageNotFound}></Route>
      </Switch>
      <ToastContainer autoClose={3000} hideProgressBar />
    </div>
  );
}

export default App;
