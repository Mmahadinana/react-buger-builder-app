import {put} from 'redux-saga/effects';
import * as actions from '../actions/index'
import axiosOrder from '../../axios_orders';

export function* initIngredientsSaga (action){
    try{
        const response = yield axiosOrder.get('/ingredients.json');
        yield put(actions.setIngredients(response.data));
        
    }catch(error){
        yield put(actions.fetchIngredientsFailed())
      
   }
}