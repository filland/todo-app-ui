
/**
   * This function looks for the @param paramName
   * 
   * @param paramName name of the param in the query
   * @param url - url query params
   * @returns value of the @param paramName or null if not found
   */
  export const getQueryParamValueFromLocationSearch = (paramName, url) => {
    let map = {};
    url
      .slice(1)
      .split("?")
      .map(param => {
        let pair = param.split("=");
        map[pair[0]] = pair[1];
      });
    return map[paramName];
  }