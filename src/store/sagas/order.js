import { put } from 'redux-saga/effects';
import * as actions from '../actions/index';
import axios from '../../axios_orders';

export function* purchaseBurgerSaga(action){
   
    yield put(actions.purchaseBurgerStart());

    try{
        const response = yield axios.post('/orders.json?auth='+action.token,action.orderData);
        yield put(actions.purchaseBurgerSuccess(response.data, action.orderData))
    }catch( error ) {
            yield put(actions.purchaseBurgerFail(error))
        }
}


export function* fetchBurgerSaga(action){

    yield put(actions.fetchOrdersStart());
    const qParams = '?auth=' + action.token +'&orderBy="userId"&equalTo="' + action.userId +'"';
   
    try{
        const response = yield axios.get('/orders.json' + qParams)
        const fetchedOrders=[]
        for (let key in response.data) {
            fetchedOrders.push({...response.data[key],
                id:key})
        }
        yield put(actions.fetchOrdersSuccess(fetchedOrders))
    } catch(error){
        yield put(actions.fetchOrdersFail(error))
    }
}
    