import { reset } from "redux-form";
import { checkoutAPI } from "../api/api";
import { clearCheckout } from "./menu-reducer";

const TOGGLE_IS_FETCHING  = "TOGGLE-IS-FETCHING";
const SET_LAST_CHECKOUT   = "SET-LAST-CHECKOUT";

let initialState = {
    isFetching: false,
    waysOfPay: [
        "Наличными (при получении)",
        "Безналичный расчёт (при получении)",
        "Онлайн картой банка",
        "Онлайн с помощью СБП (QR)",
        "Через приложение банка"
    ],
    checkHistory: [],
    checkSuccess: false
}

const checkoutReducer = (state = initialState, action) => {
    switch (action.type) {
        case TOGGLE_IS_FETCHING:
            return {
                ...state,
                isFetching: action.isFetching
            }
        case SET_LAST_CHECKOUT:
            return {
                ...state,
                checkHistory: [...state.checkHistory, action.checkout],
                checkSuccess: true
            }
        default: {
            return state
        }
    }
}

export const toggleIsFetching = (isFetching) => ({type: TOGGLE_IS_FETCHING, isFetching})
export const setLastCheckout  = (checkout) => ({type: SET_LAST_CHECKOUT, checkout})

export const postUserCheckoutTC = (address, waysOfPay) => async (dispatch, getState) => {

    const chosenFood = getState().menu.chosenFood
    const uid = getState().auth.uid
    console.log(uid)
    const payload = ({uid, address, waysOfPay, ...chosenFood})
    try {
        dispatch(toggleIsFetching(true))
        const idDoc = await checkoutAPI.postCheckout(payload)
        dispatch(setLastCheckout({idDoc, uid, address, waysOfPay, ...chosenFood}))
        dispatch(clearCheckout())
        dispatch(reset("check-out"))
        dispatch(toggleIsFetching(false))
    }
    catch (err){
        console.error(err)
    }
}

export default checkoutReducer;