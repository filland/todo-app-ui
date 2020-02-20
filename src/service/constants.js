let UI_ROOT_URL;
let SERVER_ROOT_URL_LOCAL;
if (process.env.NODE_ENV === 'production') {
    // application API URLs
    SERVER_ROOT_URL_LOCAL = process.env.SERVER_ROOT_URL;
    // frontend URLs
    UI_ROOT_URL = process.env.UI_ROOL_URL;
} else {
    // application API URLs
    SERVER_ROOT_URL_LOCAL = "http://localhost:8080";
    // frontend URLs
    UI_ROOT_URL = "http://localhost:3000"
}
export const SERVER_ROOT_URL = SERVER_ROOT_URL_LOCAL;
export const WEB_UI_ROOT_URL = UI_ROOT_URL;

// frontend URLs
export const REGISTRATION_CONFIRMATION_URL = WEB_UI_ROOT_URL + "/registration-confirmation";
export const OAUTH2_REDIRECT_URI = WEB_UI_ROOT_URL+"/oauth2/redirect";


// application API URLs
export const API_ROOT_URL = SERVER_ROOT_URL + "/api/v1";
export const GITHUB_AUTH_URL = SERVER_ROOT_URL + "/oauth2/authorize/github?redirect_uri=" + OAUTH2_REDIRECT_URI;


// key for retreiving value for the Authorization header for basic authentication
export const BASIC_AUTH_CREDS = "basicAuthCreds";
export const JWT_TOKEN = "jwtToken";

// dev
export const FAKE_LATENCY_MILLS = 0;