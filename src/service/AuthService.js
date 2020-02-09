import { API_ROOT_URL, BASIC_AUTH_CREDS, JWT_TOKEN, SERVER_ROOT_URL, WEB_UI_ROOT_URL } from "./constants";

const authenticated = "authenticated";

class AuthServiceImpl {
  register(user, successCallback, failureCallback) {
    const url = SERVER_ROOT_URL + "/auth/signup";

    let headers = {
      "Content-Type": "application/json; charset=UTF-8"
    };

    user["emailConfirmationBrowserUrl"] = WEB_UI_ROOT_URL;

    fetch(url, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(user)
    })
      .then(function(response) {
        if(response.status === 201) {
          successCallback();
        } else {
          failureCallback();
        }
      })
      .catch(function(e) {
        failureCallback();
      });
  }

  login(usernameOrEmail, password, successCallback, failureCallback) {
    this.login_jwt(usernameOrEmail, password, successCallback, failureCallback);
  }

  login_jwt(usernameOrEmail, password, successCallback, failureCallback) {
    const loginPath = SERVER_ROOT_URL + "/auth/signin";

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
        if (response.accessToken != null) {
          localStorage.setItem(authenticated, true);
          localStorage.setItem(JWT_TOKEN, response.accessToken);
        }

        successCallback();
      })
      .catch(e => {
        console.error(e);
        failureCallback();
      });
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

  /**
   * This method is used in case of OAuth2 login.
   * In this case we skip the login/password login
   * step and get a JWT right away.
   **/
  setJwtToken(jwtToken) {
    localStorage.setItem(authenticated, true);
    localStorage.setItem(JWT_TOKEN, jwtToken);
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
