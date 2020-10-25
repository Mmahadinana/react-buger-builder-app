import * as actionTypes from './actionTypes';
import axios from '../../axios_orders';

export const purchaseBurgerSuccess = (id, orderData) => {
    return{
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId : id,
        orderData: orderData

    }
}

export const purchaseBurgerFail = (error) => {
    return{
        type: actionTypes.PURCHASE_BURGER_FAIL,
        error: error

    }
}

export const purchaseBurgerStart = (error) => {
    return{
        type: actionTypes.PURCHASE_BURGER_START,
        error: error

    }
}

export const purchaseBurger = (orderData,token) => {
    return dispatch => {
        dispatch(purchaseBurgerStart());
        axios.post('/orders.json?auth='+token,orderData).then( response => {
           dispatch(purchaseBurgerSuccess(response.data, orderData))
        }).catch( error => {
            dispatch(purchaseBurgerFail(error))
        })
    }
    
}

export const purchaseInit = () => {
    return {
        type:actionTypes.PURCHASE_INIT
    }
}

export const fetchOrdersSuccess = (orders) => {
    return{
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders: orders
    }
}

export const fetchOrdersFail = (error) => {
    return{
        type: actionTypes.FETCH_INGREDIENTS_FAILED,
        error: error
    }
}

export const fetchOrdersStart = () => {
    return{
        type: actionTypes.FETCH_ORDERS_START
    }
}

export const fetchOrders = (token, userId) => {
    
    return dispatch =>{''
        const qParams = '?auth=' + token +'&orderBy="userId"&equalTo="' + userId +'"';
        dispatch(fetchOrdersStart())
        axios.get('/orders.json' + qParams).then(
            response => {
                const fetchedOrders=[]
                for (let key in response.data) {
                    fetchedOrders.push({...response.data[key],
                        id:key})
                }
                dispatch(fetchOrdersSuccess(fetchedOrders))
                // this.setState({orders:fetchedOrders,loader:false}) 
            }
        ).catch(error => {
            dispatch(fetchOrdersFail(error))
            
            // this.setState({loader:false})
        })
    }
}