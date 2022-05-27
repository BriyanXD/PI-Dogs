import { GET_DATA_API } from "../type";

const initialState = {
  dogs: [],
};

function reducers(state = initialState, action) {
  switch (action.type) {
    case GET_DATA_API:
      return {
        ...state,
        dogs: action.payload,
      };
    default:
      return state;
  }
}

export default reducers;
