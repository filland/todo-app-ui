import {
  API_ROOT_URL,
  BASIC_AUTH_CREDS,
  JWT_TOKEN,
  SERVER_ROOT_URL
} from "./constants";

const authenticated = "authenticated";

class AuthServiceImpl {
  register(user, successCallback, failureCallback) {
    const url = SERVER_ROOT_URL + "/auth/register";

    let headers = {
      "Content-Type": "application/json; charset=UTF-8"
    };

    fetch(url, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(user)
    })
      .then(r => r.json().then(data => ({ status: r.status, body: data })))
      .then(function(statusAndBody) {
        successCallback(statusAndBody);
      })
      .catch(function(e) {
        failureCallback(e);
      });
  }

  confirmRegistration(confirmationToken, successCallback, failureCallback) {
    const url = SERVER_ROOT_URL + "/auth/confirm-email";

    let headers = {
      "Content-Type": "application/json; charset=UTF-8"
    };

    let body = {
      token: confirmationToken
    };

    fetch(url, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(body)
    })
      .then(function(response) {
        if (response.status === 200) {
          successCallback();
        } else {
          failureCallback();
        }
      })
      .catch(function(e) {
        failureCallback();
      });
  }

  login(username, password, successCallback, failureCallback) {
    this.login_jwt(username, password, successCallback, failureCallback);
  }

  login_jwt(username, password, successCallback, failureCallback) {
    const loginPath = SERVER_ROOT_URL + "/auth/login";

    let headers = {
      "Content-Type": "application/json; charset=UTF-8"
    };

    let loginRequest = {};
    loginRequest.username = username;
    loginRequest.password = password;

    fetch(loginPath, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(loginRequest)
    })
      .then(r => r.json().then(data => ({ status: r.status, body: data })))
      .then(response => {
        if (response.status === 200 && response.body.accessToken != null) {
          localStorage.setItem(authenticated, true);
          localStorage.setItem(JWT_TOKEN, response.body.accessToken);
        }
        successCallback(response);
      })
      .catch(e => {
        failureCallback(e);
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
   * step and set a JWT right away.
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
