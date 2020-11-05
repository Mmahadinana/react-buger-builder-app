import { delay } from 'redux-saga/effects';
import {put, call} from 'redux-saga/effects';
import * as actions from '../actions/index'
import axios from 'axios';
//generator is next js feature that are functions that running incrementally and can be pouses
// is used here to handle side effects of async
//yield - step should execute and we wait until it is done
export function* logoutSaga(action){
    //call makes the functon to be testable
    yield call([localStorage,"removeItem"],'token');
    yield call([localStorage,"removeItem"],'expiryTime');
    yield call([localStorage,"removeItem"],'userId');
    yield put(actions.logoutSucceeded())
}

export function* checkAuthTimeoutSaga(action){

    yield delay(action.expirationTime * 1000 );
    yield put(actions.logout);

}

export function* authUserSaga(action){
        yield put(actions.authStart());
        
        const authData = {
            email:action.email,
            password: action.password,
            returnSecureToken:true
        }
        let url ='https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCqzir_UEO5YJ-45Eby6k1MhAUrpwkrUNg';
        if(!action.isSignup){
           
            url ='https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCqzir_UEO5YJ-45Eby6k1MhAUrpwkrUNg'
        }
        try{
        const response= yield axios.post(url, authData)
          
        const expiryTime =yield new Date(new Date().getTime() + response.data.expiresIn * 1000);
        yield localStorage.setItem('token',response.data.idToken);
        yield localStorage.setItem('expiryTime',expiryTime);
        yield localStorage.setItem('userId',response.data.localId);
        yield put(actions.authSuccess(response.data));
        yield put(actions.checkAuthTimeout(response.data.expiresIn));
          }catch(error){
            yield put(actions.authFail(error.response.data.error));
        }
    
}

export function* authCheckStateSaga(action){
  
    const token = yield localStorage.getItem('token');
    if(!token){
        yield put(actions.logout());
    }else{
        const expiryTime = yield new Date(localStorage.getItem('expiryTime'));
        if(expiryTime <= new Date()){
            yield put(actions.logout())
        }else{
            const userId =yield localStorage.getItem('userId');
                yield put(actions.authSuccess({'localId': userId,'idToken':token}));
                yield put(actions.checkAuthTimeout(
                    (expiryTime.getTime() - new Date().getTime()) / 1000
                )
            );
        }
        
    }
}

