import reducer from './auth';
import * as actionTypes from '../actions/actionTypes';

describe("auth reducer", () => {
    it('should return initial state', () => {
        expect(reducer(undefined,{})).toEqual({
            token: null,
            userId:null,
            error: null,
            loading: false,
            authRedirectPath: '/'
        });
    });

    it('should stoken token when authenticated',() => {
        expect(reducer({
            token: null,
            userId:null,
            error: null,
            loading: false,
            authRedirectPath: '/'
        },{
            type: actionTypes.AUTH_SUCCESS,
            authData:{idToken:'token',localId:'user-id'}
            
        })).toEqual({
            token:'token',
            userId:'user-id',
            error: null,
            loading: false,
            authRedirectPath: '/'

        })
    })
});

