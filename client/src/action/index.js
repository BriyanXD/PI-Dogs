import {
  FILTER_BY_TEMPERAMENT,
  GET_DATA_API,
  GET_TEMPS_API,
  SEARCH_BY_SEARCH_BAR,
  RESPONSE_ERROR,
  IS_LOADING,
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
// cargamos todas los match con value al estado de redux
export function searchDog(value) {
  return async function (dispatch) {
    var response = await fetch(`http://localhost:3001/api/dogs?name=${value}`);
    var resjson = await response.json();
    return dispatch({
      type: SEARCH_BY_SEARCH_BAR,
      payload: resjson,
    });
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
            if (element.temperaments.includes(temp)) {
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
