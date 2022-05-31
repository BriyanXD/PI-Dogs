import {
  FILTER_BY_TEMPERAMENT,
  GET_DATA_API,
  GET_TEMPS_API,
  SEARCH_BY_SEARCH_BAR,
  PAGE_NUMBERS,
} from "../type";

const initialState = {
  dogs: [],
  temperaments: [],
  dogs_length: 0,
  numPages: [],
};

function reducers(state = initialState, action) {
  switch (action.type) {
    case GET_DATA_API:
      return {
        ...state,
        dogs: action.payload,
        dogs_length: action.payload.length,
      };
    case SEARCH_BY_SEARCH_BAR:
      return {
        ...state,
        dogs: action.payload,
        dogs_length: action.payload.length,
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
        dogs_length: action.payload.length,
      };
    case PAGE_NUMBERS:
      return {
        ...state,
        numPages: chargePages(action.payload),
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
  return result;manejador de paginado
} */

function chargePages(value) {
  let pages = Math.ceil(value / 8);
  let numpages = [];
  for (let i = 1; i <= pages; i++) {
    numpages.push(i);
  }
  return numpages;
}

export default reducers;
