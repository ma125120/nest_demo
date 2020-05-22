export const getToken = () => window.localStorage.token;

export const setToken = token => {
  window.localStorage.token = token;
};

export const removeToken = () => window.localStorage.removeItem("token");
