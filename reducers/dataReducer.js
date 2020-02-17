import { FETCH_DATA } from "../actions/types";

const initialState = {
  theme: ""
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_DATA:
      return {
        ...state,
        theme: action.payload
      };
    default:
      return state;
  }
}
