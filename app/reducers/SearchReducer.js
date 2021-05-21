import {FAILED, PASS} from "../actions/actions";

export const SearchReducer = (result = {}, action) => {
  switch (action.type) {
    case PASS:
      return action.result;
    case FAILED:
      return action.result;
    default:
      return result;
  }
};
