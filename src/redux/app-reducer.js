import {getAuthUserDataTC} from "./auth-reducer";

const SET_SUCCESS_INITIALIZATION = "SET-SUCCESS-INITIALIZATION";
const TOGGLE_IS_FETCHING  = "TOGGLE-IS-FETCHING";

let initialState = {
    isInitialized: false,
    isFetching: true
}

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_SUCCESS_INITIALIZATION:
            return {
                ...state,
                isInitialized: true
            }
        case TOGGLE_IS_FETCHING:
            debugger
            return {
                ...state,
                isFetching: action.isFetching
            }
        default: {
            return state
        }
    }
}

export const setSuccessInitialization = () => ({type: SET_SUCCESS_INITIALIZATION});
export const toggleIsFetching = (isFetching) => ({type: TOGGLE_IS_FETCHING, isFetching})

export const initializeAppTC = () => async (dispatch) => {
    debugger
    await dispatch(getAuthUserDataTC())
    await dispatch(setSuccessInitialization())
}

export default appReducer;