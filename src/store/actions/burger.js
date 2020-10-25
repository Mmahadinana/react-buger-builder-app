import * as actionTypes from './actionTypes';
import axiosOrder from '../../axios_orders';

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
    return dispatch => {

         axiosOrder.get('/ingredients.json').then(
            res => (
                dispatch(setIngredients(res.data))
            )
        ).catch(error =>{
            
            dispatch(fetchIngredientsFailed())
        })
    }

}