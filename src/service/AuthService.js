import { ROOT_URL, API_ROOT_URL, BASIC_AUTH_CREDS } from "./Constants";

const authenticated = "authenticated";

const AuthService = {
  login: (username, password) => {
    console.log("not implemented.");
  },
  /* This method is a kind of stub for authenticating using 
    regular form with basic http authentication.
    User is authenticated when server returned the todo with the id = 1
    and the json in the response contains id and title
    this should be replaces with OAuth authentication !
  */
  login_basic_auth: (username, password, checkAuthCallback) => {
    const loginPath = API_ROOT_URL + "/auth";
    const loginAndPassInBase64 = btoa(username + ":" + password);
    const basicLoginAndPassInBase64 = "Basic " + loginAndPassInBase64;

    fetch(loginPath, {
      method: "GET",
      headers: {
        Authorization: basicLoginAndPassInBase64
      }
    })
      .then(response => {
        if (response.status === 200) {
          localStorage.setItem(authenticated, true);
          localStorage.setItem(BASIC_AUTH_CREDS, basicLoginAndPassInBase64);
        }

        checkAuthCallback();
      })
      .catch(e => console.error(e));
  },
  login_old: (username, password) => {
    const par1 = localStorage.getItem(authenticated) === null;
    const par2 = localStorage.getItem(authenticated) === "false";
    if (par1 || par2) {
      if (username === "Alex" && password === "123") {
        localStorage.setItem(authenticated, true);
      } else {
        localStorage.setItem(authenticated, false);
      }
    }
  },
  isLogged: () => {
    return localStorage.getItem(authenticated) === "true";
  },
  logout: () => {
    localStorage.removeItem(authenticated);
    localStorage.removeItem(BASIC_AUTH_CREDS);
  }
};

export default AuthService;
