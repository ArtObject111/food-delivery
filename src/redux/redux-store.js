import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import { thunk }                                                  from "redux-thunk";
import { reducer as formReducer }                                 from "redux-form"

import authReducer                                                from "./auth-reducer";
import appReducer                                                 from "./app-reducer";
import menuReducer                                                from "./menu-reducer";
import checkoutReducer from "./checkout-reducer";

let reducers = combineReducers({
    app:      appReducer,
    auth:     authReducer,
    menu:     menuReducer,
    checkout: checkoutReducer,
    form:     formReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)))

window.store = store;

export default store
