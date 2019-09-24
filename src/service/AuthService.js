const key = "authenticated";
const AuthService = {
  login: (username, password) => {
    const par1 = localStorage.getItem(key) === null;
    const par2 = localStorage.getItem(key) === "false";
    if (par1 || par2) {
      if (username === "Alex" && password === "123") {
        localStorage.setItem(key, true);
      } else {
        localStorage.setItem(key, false);
      }
    }
  },
  isLogged: () => {
    return localStorage.getItem(key) === "true";
    // return true;
  }
};

export default AuthService;