import { JWT_TOKEN, BASIC_AUTH_CREDS } from "./Constants";

export const addAuthorizationHeader = headers => {
  addJwtTokenAuthHeader(headers);
};

const addJwtTokenAuthHeader = headers => {
  headers["Authorization"] = "Bearer " + localStorage.getItem(JWT_TOKEN);
};

const addBasichAuthHeader = headers => {
  headers["Authorization"] = localStorage.getItem(BASIC_AUTH_CREDS);
};
