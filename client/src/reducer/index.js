import {
  FILTER_BY_TEMPERAMENT,
  GET_DATA_API,
  GET_TEMPS_API,
  SEARCH_BY_SEARCH_BAR,
  PAGE_NUMBERS,
  CUT_FOR_PAGING,
  FILTER_BY_DB_OR_API,
} from "../type";

const initialState = {
  dogs: [],
  temperaments: [],
  dogs_length: 0,
  numPages: [],
  cutArrayDogs: "",
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
    case CUT_FOR_PAGING:
      return {
        ...state,
        cutArrayDogs: chargeCutDogs(
          action.payload,
          state.dogs,
          state.dogs_length
        ),
      };
    case FILTER_BY_DB_OR_API:
      return {
        ...state,
        dogs: action.payload,
        dogs_length: action.payload.length,
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

function chargeCutDogs(page, dogsArray, dogLength) {
  let min = 8 * (page - 1);
  let max = 8 * page;
  if (!dogLength) return "";
  let arrayCut = dogsArray.slice(min, max);
  return arrayCut;
}

export default reducers;
