import { combineReducers } from "redux";
import courses from "./courseReducer";
import authors from "./authorReducer";
import movies from "./moviesReducer";
import rating from "./ratingReducer";
import apiCallsInProgress from "./apiStatusReducer";

const rootReducer = combineReducers({
  rating,
  courses,
  authors,
  movies,
  apiCallsInProgress,
});

export default rootReducer;
