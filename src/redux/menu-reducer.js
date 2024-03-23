import { updateObjectInArray } from "../helpers/object-helpers";
import { menuAPI }             from "../api/api";

const TOGGLE_IS_LOADING   = "TOGGLE_IS_LOADING";
const SET_MENU            = "SET-MENU";
const SAVE_SNAPSHOT       = "SAVE-SNAPSHOT";
const ADD_TO_CART         = "ADD-TO-CART";
const REMOVE_FROM_CART    = "REMOVE-FROM-CART";

let initialState = {
    isLoading: true,
    menuData: [],
    scrollSize: 20
}

const menuReducer = (state = initialState, action) => {
    switch (action.type) {
        case TOGGLE_IS_LOADING:
            return {
                ...state,
                isLoading: action.isLoading
            }
        case SET_MENU:
            return {
                ...state,
                menuData: [...state.menuData, ...action.menu]
            }
        case ADD_TO_CART:
            debugger
            const newArray = state.menuData.map( food => {
                if (food["id"] === action.foodId) {
                    let counter = food["timesChosen"]
                    counter++
                    return {...food, ...{timesChosen: counter}}
                }
                return food;
            })
            return {
                ...state,
                menuData: newArray
            }
        case REMOVE_FROM_CART:
            debugger
            let newArray1 = state.menuData.map( food => {
                if (food["id"] === action.foodId) {
                    let counter = food["timesChosen"]
                    --counter
                    return {...food, ...{timesChosen: counter}}
                }
                return food;
            })
            return {
                ...state,
                menuData: newArray1
            }
        default: {
            return state
        }
    }
}

export const toggleIsLoading = (isLoading) => ({type: TOGGLE_IS_LOADING, isLoading})
export const saveSnapshot    = (snapshot) => ({type: SAVE_SNAPSHOT, snapshot})
export const setMenu         = (menu) => ({type: SET_MENU, menu})
export const addToCart       = (foodId) => ({type: ADD_TO_CART, foodId})
export const removeFromCart  = (foodId) => ({type: REMOVE_FROM_CART, foodId})

export const getMenuTC = (scrollSize, isInitial) => async (dispatch) => {
    try {
        dispatch(toggleIsLoading(true))
        const querySnapshot = await menuAPI.getMenu(scrollSize, isInitial)

        dispatch(toggleIsLoading(false))

        const resultMenu = []
        querySnapshot.forEach((doc) => {
            const foodItem = doc.data()
            foodItem["id"] = doc.id
            foodItem["timesChosen"] = null
            console.log(foodItem)
            resultMenu.push(foodItem)
        });     
    dispatch(setMenu(resultMenu))
    }
    catch (error) {
        console.error(error)
    }
}

export default menuReducer;