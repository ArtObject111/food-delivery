import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import { thunk }                                                  from "redux-thunk";
import { reducer as formReducer }                                 from "redux-form"

import authReducer                                                from "./auth-reducer";
import appReducer                                                 from "./app-reducer";

let reducers = combineReducers({
    app: appReducer,
    auth: authReducer,
    form: formReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)))

export default store
