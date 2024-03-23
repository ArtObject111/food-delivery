import {getAuthUserDataTC} from "./auth-reducer";

const SET_SUCCESS_INITIALIZATION = "SET-SUCCESS-INITIALIZATION";
const TOGGLE_IS_FETCHING  = "TOGGLE-IS-FETCHING";

let initialState = {
    isFetching: true,
    chosenFood: [
        {foodName: "", itemsAmount: null}
    ],
    generalCoast: null,
    payWay: "",
    address: ""
}

const checkoutReducer = (state = initialState, action) => {
    switch (action.type) {
        case TOGGLE_IS_FETCHING:
            return {
                ...state,
                isFetching: action.isFetching
            }
        default: {
            return state
        }
    }
}

export const toggleIsFetching = (isFetching) => ({type: TOGGLE_IS_FETCHING, isFetching})

export const initializeAppTC = () => async (dispatch) => {
    
}

export default checkoutReducer;