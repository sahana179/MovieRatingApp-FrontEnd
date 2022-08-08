import * as types from "./moviesActionTypes";
import * as movieApi from "../../api/movieApi";
import { beginApiCall, apiCallError } from "./apiStatusActions";

export function loadMovieSuccess(movies) {
  return { type: types.LOAD_MOVIES_SUCCESS, movies };
}

export function createMovieSuccess(movie) {
  return { type: types.CREATE_MOVIE_SUCCESS, movie };
}

export function updateMovieSuccess(movie) {
  return { type: types.UPDATE_MOVIE_SUCCESS, movie };
}

export function deleteMovieOptimistic(movie) {
  return { type: types.DELETE_MOVIE_OPTIMISTIC, movie };
}

export function loadMovies() {
  return function (dispatch) {
    dispatch(beginApiCall());
    return movieApi
      .getMovies()
      .then((movies) => {
        dispatch(loadMovieSuccess(movies));
      })
      .catch((error) => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}

export function saveMovie(movie) {
  //eslint-disable-next-line no-unused-vars
  return function (dispatch, getState) {
    dispatch(beginApiCall());
    return movieApi
      .saveMovie(movie)
      .then((savedMovie) => {
        movie.id
          ? dispatch(updateMovieSuccess(savedMovie))
          : dispatch(createMovieSuccess(savedMovie));
      })
      .catch((error) => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}

export function deleteMovie(movie) {
  return function (dispatch) {
    // Doing optimistic delete, so not dispatching begin/end api call
    // actions, or apiCallError action since we're not showing the loading status for this.
    dispatch(deleteMovieOptimistic(movie));
    return movieApi.deleteMovie(movie.id);
  };
}
