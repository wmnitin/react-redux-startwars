const LOAD = 'redux-example/LOAD';

const initialState = {
  login: 'false'
};

export default function info(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD:
      return {
        ...state
      };
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        login: 'false',
        loginData: action.result
      };
    case 'LOGIN_FAIL':
      return {
        ...state,
        login: 'false',
        loginErr: action.error
      };
    case 'MANAGE_LOGIN':
      return {
        ...state,
        login: action.value
      };
    case 'SEARCH_SUCCESS':
      return {
        ...state,
        searchData: action.result
      };
    case 'SEARCH_FAIL':
      return {
        ...state,
        searchError: action.error
      };
    default:
      return state;
  }
}

export function starWarsLogin(data) {
  return {
    types: [LOAD, 'LOGIN_SUCCESS', 'LOGIN_FAIL'],
    promise: (client) => client.starWarsLogin(data)
  };
}

export function loginState(value) {
  return { type: 'MANAGE_LOGIN', value };
}

export function searchPlanets(data) {
  return {
    types: [LOAD, 'SEARCH_SUCCESS', 'SEARCH_FAIL'],
    promise: (client) => client.searchPlanets(data)
  };
}
