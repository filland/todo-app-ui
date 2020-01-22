// export const ROOT_URL = "http://194.58.104.210:8080";
 export const ROOT_URL = "http://localhost:8080";
export const API_ROOT_URL = ROOT_URL + "/api/v1";


export const OAUTH2_REDIRECT_URI = 'http://localhost:3000/oauth2/redirect'
export const GITHUB_AUTH_URL = ROOT_URL + '/oauth2/authorize/github?redirect_uri=' + OAUTH2_REDIRECT_URI;

// key for retreiving value for the Authorization header for basic authentication
export const BASIC_AUTH_CREDS = "basicAuthCreds";
export const JWT_TOKEN = "jwtToken"

// dev
export const FAKE_LATENCY_MILLS = 0;