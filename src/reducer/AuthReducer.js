export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";

const initialAuthState = {
  login: {
    redirectToRefferer: false
  }
};

export function authReducer(state = initialAuthState, action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      let loginSuccess = {
        isLoading: false,
        redirectToRefferer: true
      };
      return Object.assign({}, state, { login: loginSuccess });
    case LOGOUT_SUCCESS:
      let logoutSuccess = {
        redirectToRefferer: false
      };
      return Object.assign({}, state, { login: logoutSuccess });
    default:
      return state;
  }
}
