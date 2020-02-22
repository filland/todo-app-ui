
// frontend URLs
export const WEB_UI_ROOT_URL = process.env.REACT_APP_UI_ROOT_URL;
export const REGISTRATION_CONFIRMATION_URL = WEB_UI_ROOT_URL + "/registration-confirmation";
export const OAUTH2_REDIRECT_URI = WEB_UI_ROOT_URL+"/oauth2/redirect";

// application API URLs
export const SERVER_ROOT_URL = process.env.REACT_APP_SERVER_ROOT_URL;
export const API_ROOT_URL = SERVER_ROOT_URL + "/api/v1";
export const GITHUB_AUTH_URL = SERVER_ROOT_URL + "/oauth2/authorize/github?redirect_uri=" + OAUTH2_REDIRECT_URI;

// key for retreiving value for the Authorization header for basic authentication
export const BASIC_AUTH_CREDS = "basicAuthCreds";
export const JWT_TOKEN = "jwtToken";

// dev
export const FAKE_LATENCY_MILLS = 0;