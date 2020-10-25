import * as actionTypes from '../actions/actionTypes'
import { updatedObj } from '../../shared/utility'
const initState = {
    ingredients:null,
    totalPrice:4,
    error: false,
    building:false
};

const INGREDIENT_PRICES = {
    salad:0.6,
    meat:1.3,
    bacon:0.2,
    cheese:0.4,
};
const addIngredients = (state, action) => {

    const updatedIngredient = {[action.ingredientName]: state.ingredients[action.ingredientName] + 1}
    const updatedIngredients = updatedObj(state.ingredients, updatedIngredient)
    const updatedState ={
       ingredients:updatedIngredients,
       totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
       building:true
   }
   return updatedObj(state,updatedState);
}
const setIngredients = (state, action) => {

    return  updatedObj(state, {
        ingredients:{ 
            salad:action.ingredients.salad,
            cheese:action.ingredients.cheese,
            bacon:action.ingredients.bacon,
            meat:action.ingredients.meat,
        },
        error: false,
        totalPrice:4,
        building:false
    } ) 
}

const removeIngredients = (state, action) => {
    const updatedIng = {[action.ingredientName]: state.ingredients[action.ingredientName] - 1}
    const updatedIngs = updatedObj(state.ingredients, updatedIng)
    const updatedSt ={
        ingredients:updatedIngs,
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
    }
    return updatedObj(state,updatedSt);
}
const fetchIngredientsFailed = (state, action) => {
    return updatedObj(state,{error: true}) 
}

const burgerReducer = (state = initState, action) =>{
   
    switch (action.type) {
        case actionTypes.ORDER_CONTINUE:
           return{
                state
           }
        case actionTypes.ADD_INGREDIENT: return addIngredients(state, action); 
        case actionTypes.REMOVE_INGREDIENT: return removeIngredients(state,action)
        case actionTypes.SET_INGREDIENTS: return setIngredients(state, action)
        case actionTypes.FETCH_INGREDIENTS_FAILED: return fetchIngredientsFailed(state,action)
        default:
            return state
    }
}

export default burgerReducer;