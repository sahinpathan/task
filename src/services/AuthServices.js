import ApiService from "./ApiService";
import { API_URL } from "./AxiosInterceptor";
let postURL = API_URL + "users/";

export const signIn = (data, options = null) => {
  return ApiService.post(postURL + "login", data, options);
};

export const signUpAPI = (data, options = null) => {
	return ApiService.post(postURL + "register", data, options);
};
