import { signIn, signUpAPI } from "../../services/AuthServices";
import * as types from "./ActionType";
import toast from "react-hot-toast";

export const login = (credentials, history) => {
  return {
    type: types.LOGIN,
    credentials,
    history,
  };
};

export const loginSuccess = (payload) => {
  return {
    type: types.LOGIN_SUCCESS,
    payload,
  };
};

export const loginFailure = (error) => {
  return {
    type: types.LOGIN_FAILURE,
    error,
  };
};

export const logIn = (data,navigate) => {
  return function (dispatch) {
    signIn(data)
      .then((res) => {
        if (res?.token) {
          dispatch(loginSuccess(res));
          sessionStorage.setItem("token", res?.token);
          navigate("/dashboard");
        } 
      })
      .catch((error) => {
        dispatch(loginFailure(error));
        toast.error(error.message);
      });
  };
};

// logout
export const logout = (navigate) => {
  sessionStorage.clear();
  localStorage.clear();
  navigate("/login")
  return {
    type: types.LOGOUT,
  };
};


//signUp

export const signUp = (payload) => {
	return {
		type: types.SIGN_UP,
		payload,
	};
};

export const signUpSuccess = (payload) => {
	return {
		type: types.SIGN_UP_SUCCESS,
		payload,
	};
};

export const signUpFailure = (error) => {
	return {
		type: types.SIGN_UP_FAILURE,
		error,
	};
};

export const signUpAction = (data, navigate) => {
	return function (dispatch) {
		dispatch(signUp(data));
		signUpAPI(data)
			.then((res) => {
				if (res) {
					dispatch(signUpSuccess(res));
					navigate("/login");
				} 
			})
			.catch((error) => {
        toast.error(error.message)
				dispatch(signUpFailure(error?.message));
			});
	};
};
