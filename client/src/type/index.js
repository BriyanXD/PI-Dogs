// TIPOS DE ACCION

// trae la info de la api por raza
export const GET_DATA_API = "GET_DATA_API";

// accion para buscar por raza
export const SEARCH_BY_SEARCH_BAR = "SEARCH_BY_SEARCH_BAR";

// trae los temperamentos de la api
export const GET_TEMPS_API = "GET_TEMPS_API";

//filtra por temperamentos
export const FILTER_BY_TEMPERAMENT = "FILTER_BY_TEMPERAMENT";

// accion para el paginado agrega valores al estado de redux
//para paginar agrega el numero de paginas
export const PAGE_NUMBERS = "PAGE_NUMBERS";

// corta el array de dogs para mostrar solo los que se requiere en la pagina
export const CUT_FOR_PAGING = "CUT_FOR_PAGING";

// accion para el filtrado de base de datos y api
export const FILTER_BY_DB_OR_API = "FILTER_BY_DB_OR_API";

/* //modifica el estado para mostrar el componente de carga
export const IS_LOADING = "IS_LOADING";

//modifica el estado cuando la respueta de la api fue un 404
export const RESPONSE_ERROR = "RESPONSE_ERROR"; */
