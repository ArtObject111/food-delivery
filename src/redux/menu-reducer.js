import { updateObjectInArray } from "../helpers/object-helpers";
import { menuAPI }             from "../api/api";

const TOGGLE_IS_LOADING   = "TOGGLE_IS_LOADING";
const SET_MENU            = "SET-MENU";
const SAVE_SNAPSHOT       = "SAVE-SNAPSHOT";
const ADD_TO_CART         = "ADD-TO-CART";
const REMOVE_FROM_CART    = "REMOVE-FROM-CART";
const CLEAR_CHECKOUT      = "CLEAR-CHECKOUT";

let initialState = {
    isInitializedMenu: false,
    isLoading: true,
    scrollSize: 12,
    totalCost: null,
    menuData: [],
    chosenFood: []
}

//reducer helpers
const updateChosenFood = (chosenFood, chosenId, foodItem) => {
    let updatedChosenFood = chosenFood
    const index = updatedChosenFood.findIndex(element => element.id === chosenId);
    index !== -1 ? updatedChosenFood[index] = foodItem : updatedChosenFood.push(foodItem)
    return updatedChosenFood
}

const sumTotalCost = (chosenFood) => {
    return chosenFood.reduce( (acc, chosenItem) => {
        return acc + chosenItem.price * chosenItem.timesChosen
    }, 0)
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
                menuData: [...state.menuData, ...action.menu],
                isInitializedMenu: true
            }
        case ADD_TO_CART:
            var updatedChosen
            const newArray = state.menuData.map( foodItem => {
                if (foodItem["id"] === action.foodId) {
                    foodItem["timesChosen"] = ++foodItem["timesChosen"]
                    updatedChosen = updateChosenFood(state.chosenFood, action.foodId, foodItem)
                }
                return foodItem;
            })
            var sumCheck = sumTotalCost(updatedChosen)
            return {
                ...state,
                menuData: newArray,
                chosenFood: updatedChosen,
                totalCost: sumCheck

            }
        case REMOVE_FROM_CART:
            var updatedChosen
            let newArray1 = state.menuData.map( foodItem => {
                if (foodItem["id"] === action.foodId) {
                    foodItem["timesChosen"] = --foodItem["timesChosen"]
                    updatedChosen = updateChosenFood(state.chosenFood, action.foodId, foodItem)
                }
                return foodItem;
            })
            var sumCheck = sumTotalCost(updatedChosen)
            return {
                ...state,
                menuData: newArray1,
                chosenFood: updatedChosen,
                totalCost: sumCheck
            }
        case CLEAR_CHECKOUT:
            return {
                ...state,
                menuData: "",
                chosenFood: ""
            }
        default: {
            return state
        }
    }
}

export const toggleIsLoading  = (isLoading) => ({type: TOGGLE_IS_LOADING, isLoading})
export const saveSnapshot     = (snapshot) => ({type: SAVE_SNAPSHOT, snapshot})
export const setMenu          = (menu) => ({type: SET_MENU, menu})
export const addToCart        = (foodId) => ({type: ADD_TO_CART, foodId})
export const removeFromCart   = (foodId) => ({type: REMOVE_FROM_CART, foodId})
export const clearCheckout    = () => ({type: CLEAR_CHECKOUT})

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
        console.log("Повторная загрузка")
        dispatch(getMenuTC(scrollSize, isInitial))
    }
}

export default menuReducer;