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
  POST_FORM,
} from "../type";

// cargamos todas las razas al estado de redux
export function getDogs() {
  return async function (dispatch) {
    var response = await fetch("http://localhost:3001/api/dogs").then(
      (response) => response.json()
    );
    return dispatch({
      type: GET_DATA_API,
      payload: response,
    });
  };
}
// agregamos todas los match con value al estado de redux
export function searchDog(value) {
  return async function (dispatch) {
    /*     try { */
    var response = await fetch(`http://localhost:3001/api/dogs?name=${value}`);
    var resjson = await response.json();
    return dispatch({
      type: SEARCH_BY_SEARCH_BAR,
      payload: resjson,
    });
    /*     } catch (error) {
      console.log("Error: 404, ", value, "No se encuentra");
    } */
  };
}
// cargamos todos los temperametos al estado de redux
export function getTemperaments() {
  return async function (dispatch) {
    let result = await fetch(`http://localhost:3001/api/temperament`).then(
      (result) => result.json()
    );
    return dispatch({
      type: GET_TEMPS_API,
      payload: result,
    });
  };
}

// filtramos por temperameto
export function filterByTemperament(temp) {
  return async function (dispatch) {
    let res = await fetch("http://localhost:3001/api/dogs")
      .then((result) => result.json())
      .then((result) => {
        if (temp === "all") return result;
        let resultFilter = result.filter((element) => {
          if (element.createdDB) {
            if (!element.temperaments) return null;
            let temps = element.temperaments.map((temp) => temp.name);
            if (temps.includes(temp)) {
              return element;
            }
          } else {
            if (!element.temperaments) return null;
            let ressplit = element.temperaments.split(",");
            let restrim = ressplit.map((element) => element.trim());
            if (restrim.includes(temp)) {
              return element;
            }
          }
          return null;
        });
        return resultFilter;
      });
    return dispatch({
      type: FILTER_BY_TEMPERAMENT,
      payload: res,
    });
  };
}

/* export function paginated() {
  return async function (dispatch) {
    var resp = await fetch("http://localhost:3001/api/dogs")
      .then((response) => response.json())
      .then((response) => {
        let pages = Math.ceil(response.length / 8);
        let numpages = [];
        for (let i = 1; i <= pages; i++) {
          numpages.push(i);
        }
        return numpages;
      });
    console.log(resp);
    return dispatch({
      type: PAGINATED,
      payload: resp,
    });
  };
} */

// cargamos el numero de paginas para mostrar en la app
export function dogNumberForPagination(lengthDogs) {
  return async function (dispatch) {
    return dispatch({
      type: PAGE_NUMBERS,
      payload: lengthDogs,
    });
  };
}

// cortamos el array para mostrarlo en la pagina
export function cutForPaging(page) {
  return {
    type: CUT_FOR_PAGING,
    payload: page,
  };
}

// filtramos si viene de la db o de la api
export function filterByDBorAPI(type) {
  return async function (dispatch) {
    let responseAPI = await fetch("http://localhost:3001/api/dogs");
    let responseJSON = await responseAPI.json();

    if (type === "all") {
      return dispatch({
        type: FILTER_BY_DB_OR_API,
        payload: responseJSON,
      });
    }

    let responseFilter = responseJSON.filter((element) => {
      if (element.createdDB && type === "db") return element;
      if (!element.createdDB && type === "api") return element;
      return null;
    });
    if (responseFilter.length <= 0)
      responseFilter = { error: "Datos no encontrados" };
    return dispatch({
      type: FILTER_BY_DB_OR_API,
      payload: responseFilter,
    });
  };
}
// Ordena el resultado de manera alfabetica
export function orderByAlphabetAction(orderType) {
  return {
    type: ORDER_BY_ALPHABET,
    payload: orderType,
  };
}

export function ordenByWeigthtAction(orderType) {
  return {
    type: ORDER_BY_WEIGTH,
    payload: orderType,
  };
}

export function switchVisibleDetail(boolean, race) {
  return async function (dispatch) {
    var response = await fetch(`http://localhost:3001/api/dogs?name=${race}`);
    var resjson = await response.json();
    return dispatch({
      type: SWITCH_VISIBLE_DETAIL,
      payload: {
        visibleDetail: boolean,
        infoDetail: resjson,
      },
    });
  };
}

export function postForm(objectRace) {
  return async function (dispatch) {
    var response = await fetch("http://localhost:3001/api/dogs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(objectRace),
    });
    var responseJson = await response.json();
    return dispatch({
      type: POST_FORM,
      payload: responseJson,
    });
  };
}
