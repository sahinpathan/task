import { combineReducers } from "redux";
import commonReducer from "./common/Reducer";
import authReducer from "./Auth/Reducer";

const rootReducer = combineReducers({
  Common: commonReducer,
  Auth: authReducer,
});

export default rootReducer;
