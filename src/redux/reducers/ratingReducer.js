import * as types from "../actions/ratingActionTypes";
import initialState from "./initialState";

export default function ratingReducer(state = initialState.rating, action) {
  switch (action.type) {
    case types.CREATE_RATING_SUCCESS:
      return [...state, { ...action.rating }];
    case types.UPDATE_RATING_SUCCESS:
      return state.map((rating) =>
        rating._id === action.rating._id ? action.rating : rating
      );
    case types.LOAD_RATING_SUCCESS:
      return action.rating;
    case types.DELETE_RATING_OPTIMISTIC:
      return state.filter((rating) => rating._id !== action.rating._id);
    default:
      return state;
  }
}
