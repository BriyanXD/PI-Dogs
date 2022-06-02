import {
  FILTER_BY_TEMPERAMENT,
  GET_DATA_API,
  GET_TEMPS_API,
  SEARCH_BY_SEARCH_BAR,
  PAGE_NUMBERS,
  CUT_FOR_PAGING,
  FILTER_BY_DB_OR_API,
  ORDER_BY_ALPHABET,
  ORDER_BY_WEIGTH,
  SWITCH_VISIBLE_DETAIL,
} from "../type";

const initialState = {
  dogs: [],
  temperaments: [],
  dogs_length: 0,
  numPages: [],
  cutArrayDogs: "",
  stateDetail: {
    visibleDetail: false,
    infoDetail: {},
  },
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
    case ORDER_BY_ALPHABET:
      return {
        ...state,
        dogs: orderByAlphabet(action.payload, state.dogs),
      };
    case ORDER_BY_WEIGTH:
      return {
        ...state,
        dogs: orderByWeigth(action.payload, state.dogs),
      };
    case SWITCH_VISIBLE_DETAIL:
      return {
        ...state,
        stateDetail: action.payload,
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

//calcula las paginas necesarias
function chargePages(value) {
  let pages = Math.ceil(value / 8);
  let numpages = [];
  for (let i = 1; i <= pages; i++) {
    numpages.push(i);
  }
  return numpages;
}

//corta el array para mostrar las paginas
function chargeCutDogs(page, dogsArray, dogLength) {
  let min = 8 * (page - 1);
  let max = 8 * page;
  if (!dogLength) return "";
  let arrayCut = dogsArray.slice(min, max);
  return arrayCut;
}

//orden alfabetico
function orderByAlphabet(orderType, dogstate) {
  let resultOrder = "";
  if (orderType === "AaZz") {
    resultOrder = dogstate.sort((a, b) => {
      let anterior = a.name.substr(0, 2);
      let actual = b.name.substr(0, 2);
      if (anterior > actual) return 1;
      if (anterior < actual) return -1;
      return 0;
    });
  } else {
    resultOrder = dogstate.sort((a, b) => {
      let anterior = a.name.substr(0, 2);
      let actual = b.name.substr(0, 2);
      if (anterior < actual) return 1;
      if (anterior > actual) return -1;
      return 0;
    });
  }
  return resultOrder;
}

function orderByWeigth(orderType, dogstate) {
  let resultOrder = "";

  if (orderType === "min") {
    resultOrder = dogstate.sort((a, b) => {
      let [minAnterior, maxAnterior] = a.weight.split("-");
      let [minActual, maxActual] = b.weight.split("-");

      minAnterior = parseInt(minAnterior);
      minActual = parseInt(minActual);

      if (isNaN(minAnterior)) minAnterior = a.weight;
      if (isNaN(minActual)) minActual = b.weight;

      if (isNaN(minAnterior)) minAnterior = maxAnterior;
      if (isNaN(minActual)) minActual = maxActual;

      if (minAnterior > minActual) return 1;
      if (minAnterior < minActual) return -1;
      return 0;
    });
  } else {
    resultOrder = dogstate.sort((a, b) => {
      let [minAnterior, maxAnterior] = a.weight.split("-");
      let [minActual, maxActual] = b.weight.split("-");

      maxAnterior = parseInt(maxAnterior);
      maxActual = parseInt(maxActual);

      if (isNaN(maxAnterior)) maxAnterior = a.weight;
      if (isNaN(maxActual)) maxActual = b.weight;

      if (isNaN(maxAnterior)) maxAnterior = minAnterior;
      if (isNaN(maxActual)) maxActual = minActual;

      if (maxAnterior < maxActual) return 1;
      if (maxAnterior > maxActual) return -1;
      return 0;
    });
  }
  return resultOrder;
}

export default reducers;

/*       if (isNaN(minAnterior)) {
        // conseguimos el peso imperial minimo del elemento anterior
        let [minImpAnterior] = a.weight.imperial.split("-");
        //busca el minimo imperial y lo convierte
        minAnterior = parseInt(minImpAnterior) / 2.204;
        // en caso de no encontrar valor imperial
        if (!Number.isInteger(minAnterior)) {
          let [, maxAnterior] = a.weight.metric.split("-");
          minAnterior = maxAnterior;
        }
      }
      if (isNaN(minActual)) {
        //conseguimos el peso imperial minimo del elemento actua;
        let [minImpActual] = b.weight.imperial.split("-");
        //buscamos el valor imperia y lo convierte
        minActual = parseInt(minImpActual) / 2.204;
        //usamos el valor maximo en caso de no encontrar valor imperia;
        if (!Number.isInteger(minActual)) {
          let [, maxActual] = b.weight.metric.split("-");
          minActual = maxActual;
        }
      } */

//convertimos el sistema en caso de no econtrar
//su propio valor
/*       if (isNaN(maxAnterior)) {
        let [, maxImpAnterior] = a.weight.imperial.split("-");
        maxAnterior = parseInt(maxImpAnterior) / 2.2046;
      }
      if (isNaN(maxActual)) {
        let [, maxImpActual] = b.weight.imperial.split("-");
        maxAnterior = parseInt(maxImpActual) / 2.2046;
      } */
