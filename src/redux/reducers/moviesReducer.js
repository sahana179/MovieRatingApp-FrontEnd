import * as types from "../actions/moviesActionTypes";
import initialState from "./initialState";

export default function moviesReducer(state = initialState.movies, action) {
  switch (action.type) {
    case types.CREATE_MOVIE_SUCCESS:
      return [...state, { ...action.movie }];
    case types.UPDATE_MOVIE_SUCCESS:
      return state.map((movie) =>
        movie.id === action.movie.id ? action.movie : movie
      );
    case types.LOAD_MOVIES_SUCCESS:
      return action.movies;
    case types.DELETE_MOVIE_OPTIMISTIC:
      return state.filter((movie) => movie.id !== action.movie.id);
    default:
      return state;
  }
}
