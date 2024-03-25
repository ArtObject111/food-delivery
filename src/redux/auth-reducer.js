import { getAuth, onAuthStateChanged } from "firebase/auth"
import { authAPI }                     from "../api/api"
import { toggleIsFetching }            from "./app-reducer"
import { stopSubmit }                  from "redux-form"
import { clearCheckout }               from "./menu-reducer"

let initialState = {
    isAuth: false,
    email: "",
    uid: ""
}

const SET_USER = "SET-USER"

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER:
            return {
                ...state,
                isAuth: action.isAuth,
                email: action.email,
                uid: action.uid
            }
        default: {
            return state
        }
    }
}

export const setUser = (isAuth, email, uid) => ({type: SET_USER, isAuth, email, uid})

export const signUpUserTC = (email, password) => async(dispatch) => {
    try{
        dispatch(toggleIsFetching(true))
        await authAPI.signUp(email, password)
        dispatch(toggleIsFetching(false))
    }
    catch (error) {
        console.error(error.code)
        const message = error.code ? error.code : "Some error"
        const action = stopSubmit("create-user", {_error: message})
        await dispatch(toggleIsFetching(false))
        dispatch(action)
    }
}

export const signInUserTC = (email, password) => async (dispatch) => {
    try {
        dispatch(toggleIsFetching(true))
        await authAPI.signIn(email, password)
    }
    catch (error) {
        console.error(error.code)
        const message = error.code ? error.code : "Some error"
        const action = stopSubmit("auth-user", {_error: message})
        await dispatch(toggleIsFetching(false))
        dispatch(action)
    }
}

export const signOutUserTC = () => async (dispatch) => {
    try {
        await authAPI.signOut()
        dispatch(setUser(false, ""))
        dispatch(clearCheckout())
    }
    catch (error) {
        console.error(error.code)
        const message = error.code ? error.code : "Some error"
        const action = stopSubmit("auth", {_error: message})
        dispatch(action)
    }
}

export const getAuthUserDataTC = () => async(dispatch) => {
    dispatch(toggleIsFetching(true))
    const auth = getAuth()
        onAuthStateChanged(auth, user => {
            console.log(user)
            !!user &&
            dispatch(setUser(true, auth.currentUser.email, auth.currentUser.uid))
            dispatch(toggleIsFetching(false))
        })
}

export default authReducer
