export const saveToken = (token) => sessionStorage.setItem("token", token);
export const getToken = () => sessionStorage.getItem("token");
export const logout = () => sessionStorage.removeItem("token");
export const isLoggedIn = () => !!getToken();
