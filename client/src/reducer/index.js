import {
  FILTER_BY_TEMPERAMENT,
  GET_DATA_API,
  GET_TEMPS_API,
  SEARCH_BY_SEARCH_BAR,
} from "../type";

const initialState = {
  dogs: [],
  temperaments: [],
};

function reducers(state = initialState, action) {
  switch (action.type) {
    case GET_DATA_API:
      return {
        ...state,
        dogs: action.payload,
      };
    case SEARCH_BY_SEARCH_BAR:
      return {
        ...state,
        dogs: action.payload,
      };
    case GET_TEMPS_API:
      return {
        ...state,
        temperaments: action.payload,
      };
    case FILTER_BY_TEMPERAMENT:
      return {
        ...state,
        dogs: action.payload,
      };
    default:
      return state;
  }
}

/* async function searchRace(state, payload) {
  let result = await state.filter((dog) => {
    if (dog.name.includes(payload)) {
      console.log(dog);
      return dog;
    }
    return null;
  });
  return result;
} */

export default reducers;
