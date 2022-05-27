import { GET_DATA_API } from "../type";

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
