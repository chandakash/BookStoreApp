import { createStore, applyMiddleware } from "redux";
import logger from 'redux-logger'; //for debugging our redux section
import thunk from "redux-thunk";
import rootReducer from "./rootReducer";

const middlewares = [logger,thunk];

const store = createStore(rootReducer, applyMiddleware(...middlewares));

export default store;
