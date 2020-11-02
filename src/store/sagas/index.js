import { takeEvery } from 'redux-saga/effects'; // allow us take something when they occurre
import {logoutSaga, checkAuthTimeoutSaga, authUserSaga, authCheckStateSaga} from './auth';
import { initIngredientsSaga } from './burger';
import { purchaseBurgerSaga, fetchBurgerSaga} from './order';

import * as actionTypes from '../actions/actionTypes';

export function* watchAuth(){
    yield takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga); //listener
    yield takeEvery(actionTypes.AUTH_CHECK_TIMEOUT,checkAuthTimeoutSaga);
    yield takeEvery(actionTypes.AUTH_USER,authUserSaga);
    yield takeEvery(actionTypes.AUTH_CHECK_INITIAL_STATE,authCheckStateSaga)
}

export function* watchIngredients(){
    yield takeEvery(actionTypes.INITIAL_INGREDIENTS,initIngredientsSaga)
}

export function* watchOrders(){
    yield takeEvery(actionTypes.INIT_PURCHASE_BURGER,purchaseBurgerSaga)
    yield takeEvery(actionTypes.FETCH_ORDERS,fetchBurgerSaga)
}
