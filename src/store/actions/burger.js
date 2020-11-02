import * as actionTypes from './actionTypes';

//remove ingredient action creator
export const removeIngredients = (name) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: name
    }
}
//add ingredient action creator
export const addIngredients = (name) => {
    return{
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: name
    }

}

export const setIngredients = (ingredients) => {
        return {
            type: actionTypes.SET_INGREDIENTS,
            ingredients: ingredients
        }
}

export const fetchIngredientsFailed = () => {
        return {
            type: actionTypes.FETCH_INGREDIENTS_FAILED
        }
}

export const initIngredients = () => {
    return{
        type: actionTypes.INITIAL_INGREDIENTS
    }

}