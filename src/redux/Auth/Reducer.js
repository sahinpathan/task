import * as types from "./ActionType";

const initialState = {
  isAuthenticated: false,
  user_id: "",
  token: null,
  error: null,
  loader: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.LOGIN:
      return {
        ...state,
        error: null,
      };
    case types.LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        token: action.payload.token,
        user_id: action.payload.userId,
        error: null,
      };
    case types.LOGIN_FAILURE:
      return {
        ...state,
        error: action.error,
      };
    case types.LOGOUT:
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        error: null,
        user_id:null
      };
    case types.LOGOUT_SUCCESS:
      return {
        ...state,
        isAuthenticated: false,
        user: "",
        token: null,
        user_id:null
      };
    case types.LOGOUT_FAILURE:
      return {
        ...state,
        isAuthenticated: false,
        user: "",
        token: null,
        user_id:null
      };
      case types.SIGN_UP:
			return {
				...state,
				error: null,
				loader: true,
				isSuccess: null,
			};
		case types.SIGN_UP_SUCCESS:
			return {
				...state,
				error: null,
				loader: false,
			};
		case types.SIGN_UP_FAILURE:
			return {
				...state,
				loader: false,
				error: action.error,
			};
    default:
      return state;
  }
};

export default authReducer;
