import {
  ROOT_URL,
  API_ROOT_URL,
  BASIC_AUTH_CREDS,
  JWT_TOKEN
} from "./Constants";

const authenticated = "authenticated";

class AuthServiceImpl {
  login(usernameOrEmail, password, authCallback) {
    this.login_jwt(usernameOrEmail, password, authCallback);
  }

  login_jwt(usernameOrEmail, password, authCallback) {
    const loginPath = API_ROOT_URL + "/auth/signin";

    let headers = {
      "Content-Type": "application/json; charset=UTF-8"
    };

    let loginRequest = {};
    loginRequest.usernameOrEmail = usernameOrEmail;
    loginRequest.password = password;

    fetch(loginPath, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(loginRequest)
    })
      .then(function(response) {
        return response.json();
      })
      .then(response => {
        console.log(response);
        if (response.accessToken != null) {
          localStorage.setItem(authenticated, true);
          localStorage.setItem(JWT_TOKEN, response.accessToken);
        }

        authCallback();
      })
      .catch(e => console.error(e));
  }

  /* This method is a kind of stub for authenticating using 
    regular form with basic http authentication.
    User is authenticated when server returned the todo with the id = 1
    and the json in the response contains id and title
    this should be replaces with OAuth authentication !
  */
  login_basic_auth(username, password, checkAuthCallback) {
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
  }

  login_stub(username, password) {
    const par1 = localStorage.getItem(authenticated) === null;
    const par2 = localStorage.getItem(authenticated) === "false";
    if (par1 || par2) {
      if (username === "Alex" && password === "123") {
        localStorage.setItem(authenticated, true);
      } else {
        localStorage.setItem(authenticated, false);
      }
    }
  }
  isLogged() {
    return localStorage.getItem(authenticated) === "true";
  }

  logout() {
    localStorage.removeItem(authenticated);
    localStorage.removeItem(BASIC_AUTH_CREDS);
    localStorage.removeItem(JWT_TOKEN);
  }
}

const AuthService = new AuthServiceImpl();

export default AuthService;
