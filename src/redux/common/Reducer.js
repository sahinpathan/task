import * as types from "./ActionType";

const initialState = {
  isNavExpanded: false,
  FormData: [],
  error: "",
  message: "",
  Form: {},
};

const commonReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.IS_NAV_EXPANDED:
      return {
        ...state,
        isNavExpanded: !state.isNavExpanded,
      };
    case types.GET_ALL_FORM_SUCCESS:
      return {
        ...state,
        isLoading: false,
        FormData: action.payload,
      };
    case types.ADD_FORM_SUCCESS:
      return {
        ...state,
        isLoading: false,
        message: action.payload,
      };
    case types.UPDATE_FORM_SUCCESS:
      return {
        ...state,
        isLoading: false,
        message: action.payload.message,
      };
    case types.DELETE_FORM_SUCCESS:
      return {
        ...state,
        isLoading: false,
        message: action.payload,
      };

    default:
      return state;
  }
};

export default commonReducer;
