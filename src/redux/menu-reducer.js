import { menuAPI } from "../api/api";

const TOGGLE_IS_LOADING   = "TOGGLE_IS_LOADING";
const SET_MENU            = "SET-MENU";
const SAVE_SNAPSHOT       = "SAVE-SNAPSHOT";

let initialState = {
    isLoading: true,
    menuData: [],
    scrollSize: 20,
    lastSnapshot: ""
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
        case SAVE_SNAPSHOT:
            return {
                ...state,
                lastSnapshot: action.lastSnapshot
            }
        default: {
            return state
        }
    }
}

export const toggleIsLoading = (isLoading) => ({type: TOGGLE_IS_LOADING, isLoading})
export const saveSnapshot    = (snapshot) => ({type: SAVE_SNAPSHOT, snapshot})
export const setMenu         = (menu) => ({type: SET_MENU, menu})

export const getMenuTC = (scrollSize, isInitial) => async (dispatch) => {
    try {
        dispatch(toggleIsLoading(true))
        const querySnapshot = await menuAPI.getMenu(scrollSize, isInitial)

        dispatch(toggleIsLoading(false))

        const resultMenu = []
        querySnapshot.forEach((doc) => {
            const foodItem = doc.data()
            foodItem["id"] = doc.id
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