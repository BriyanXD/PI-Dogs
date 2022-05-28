import { GET_DATA_API, SEARCH_BY_SEARCH_BAR } from "../type";

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
