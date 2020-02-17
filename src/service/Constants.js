
// frontend URL
export const WEB_UI_ROOT_URL = "http://localhost:3000";
export const REGISTRATION_CONFIRMATION_URL = WEB_UI_ROOT_URL + "/registration-confirmation";
export const OAUTH2_REDIRECT_URI = WEB_UI_ROOT_URL+"/oauth2/redirect";

// application API urls
export const SERVER_ROOT_URL = "http://194.58.104.210:8080";

// export const SERVER_ROOT_URL = "http://localhost:8080";
export const API_ROOT_URL = SERVER_ROOT_URL + "/api/v1";
export const GITHUB_AUTH_URL = SERVER_ROOT_URL + "/oauth2/authorize/github?redirect_uri=" + OAUTH2_REDIRECT_URI;


// key for retreiving value for the Authorization header for basic authentication
export const BASIC_AUTH_CREDS = "basicAuthCreds";
export const JWT_TOKEN = "jwtToken";

// dev
export const FAKE_LATENCY_MILLS = 0;