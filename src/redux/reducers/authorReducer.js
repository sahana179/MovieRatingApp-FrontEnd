import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function authorReducer(state = initialState.authors, action) {
  switch (action.type) {
    case types.CREATE_AUTHOR:
      return [...state, { ...action.author }];
    case types.CREATE_AUTHOR_SUCCESS:
      return [...state, { ...action.author }];
    case types.UPDATE_AUTHOR_SUCCESS:
      return state.map((author) =>
        author.id === action.author.id ? action.author : author
      );
    case types.LOAD_AUTHORS_SUCCESS:
      return action.authors;
    case types.DELETE_AUTHOR_OPTIMISTIC:
      return state.filter((author) => author.id !== action.author.id);
    default:
      return state;
  }
}
