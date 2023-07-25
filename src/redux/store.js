import { applyMiddleware, compose } from "redux";
import { legacy_createStore as createStore } from "redux";
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' 
import reduxThunk from "redux-thunk";
import rootReducer from "./root-reducer";

const middleware = [reduxThunk];
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const persistConfig = {
  key: "root",
  storage,
  whitelist: [
    "Auth"
  ],
};

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = createStore(
  persistedReducer,
  composeEnhancer(applyMiddleware(...middleware))
);

export const persistor = persistStore(store);
