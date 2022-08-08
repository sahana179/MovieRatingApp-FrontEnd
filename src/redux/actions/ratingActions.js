import * as types from "./ratingActionTypes";
import * as ratingApi from "../../api/ratingApi";
import { beginApiCall, apiCallError } from "./apiStatusActions";

export function loadRatingSuccess(rating) {
  return { type: types.LOAD_RATING_SUCCESS, rating };
}

export function createRatingSuccess(rating) {
  return { type: types.CREATE_RATING_SUCCESS, rating };
}

export function updateRatingSuccess(rating) {
  return { type: types.UPDATE_RATING_SUCCESS, rating };
}

export function deleteRatingOptimistic(rating) {
  return { type: types.DELETE_RATING_OPTIMISTIC, rating };
}

export function loadRating(movieid, userid) {
  return function (dispatch) {
    dispatch(beginApiCall());
    return ratingApi
      .getRating(movieid, userid)
      .then((rating) => {
        dispatch(loadRatingSuccess(rating));
        dispatch(loadRatingSuccess(rating));
      })
      .catch((error) => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}

export function saveRating(rating) {
  //eslint-disable-next-line no-unused-vars
  return function (dispatch, getState) {
    dispatch(beginApiCall());
    return ratingApi
      .addRating(rating)
      .then((savedRating) => {
        rating._id
          ? dispatch(updateRatingSuccess(savedRating))
          : dispatch(createRatingSuccess(savedRating));
      })
      .catch((error) => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}

// export function deleteRating(rating) {
//   return function (dispatch) {
//     // Doing optimistic delete, so not dispatching begin/end api call
//     // actions, or apiCallError action since we're not showing the loading status for this.
//     dispatch(deleteRatingOptimistic(rating));
//     return ratingApi.deleteRating(rating.id);
//   };
// }
