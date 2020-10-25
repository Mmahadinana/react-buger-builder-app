import * as actionTypes from '../actions/actionTypes';
import { updatedObj } from '../../shared/utility';

const initState = {
    order: [],
    purchased:false,
    loading: false
};

const purchaseBurgerSuccess = (state,action) =>{
    const newOrder = updatedObj(action.orderData,{id: action.id });
    return updatedObj(state,{
            loading: false,
            order: state.order.concat(newOrder),
            purchased: true
    })
}

const purchaseInit = (state,action) =>{
    return updatedObj(state,{ purchased: false })
}

const purchaseBurgerFail = (state,action) =>{

    return updatedObj(state, {loading: false });
}

const purchasedBurgerStart = (state,action) => {
     return updatedObj(state,{ loading: true });
}

const fetchOrderStart = (state,action) => {
    return updatedObj(state,{ loading: true });
}

const fetchOrdersSuccess = (state,action) => {
    return updatedObj(state,{ order: action.orders, loading: false });
}

const fetchOrdersFail = (state,action) => {
    return updatedObj(state, {loading: false }); 
}
const orderReducer = (state = initState, action) =>{

    switch (action.type) {

        case actionTypes.PURCHASE_INIT:return purchaseInit (state,action);  
        case actionTypes.PURCHASE_BURGER_SUCCESS: return purchaseBurgerSuccess (state,action); 
        case actionTypes.PURCHASE_BURGER_FAIL: return purchaseBurgerFail(state,action);
        case actionTypes.PURCHASE_BURGER_START: return  purchasedBurgerStart(state,action);  

        case actionTypes.FETCH_ORDERS_START:return  fetchOrderStart(state,action);   
        case actionTypes.FETCH_ORDERS_SUCCESS: return  fetchOrdersSuccess(state,action); 
        case actionTypes.FETCH_ORDERS_FAIL: return  fetchOrdersFail(state,action);          
        default:
            return state
    }
}
export default orderReducer;