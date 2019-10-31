import { createAction, props, State , Action, createReducer,on, createFeatureSelector, createSelector } from '@ngrx/store';
import { Iuser } from 'src/app/models/iuser';

export interface AuthState{
    user: Iuser;
    isAauthenticated : boolean;
    error : string;
}

export const login_action = createAction('[LOGIN SCREEN] LOGIN', props<{userid: string, pwd : string }>());
export const login_success_action = createAction('[LOGIN SCREEN] LOGIN SUCCESS', props<{user : Iuser }>());
export const login_fail_action = createAction('[LOGIN SCREEN] LOGIN FAIL', props<{error : string}>());
export const logout_action = createAction('[LOGIN SCREEN] LOGOUT');

export const initialState : AuthState = {
    user : undefined,
    isAauthenticated : false,
    error : 'Enter Credentials'
}

export function Reducer( state : AuthState , action : Action  ) : AuthState{
    return AuthReducer(state,action);
}

export const AuthReducer = createReducer(
    initialState,
    on(login_success_action, (state, action) =>{
        return { ...state, user :  action.user,  isAauthenticated : true, error : 'Input Your Credentials'}
    }),
    on(login_fail_action, (state, action) =>{
        return { ...state, user : undefined,  isAauthenticated : false, error : action.error}
    }),
    on(logout_action, (state, action) =>{
        return { ...state, user : undefined,  isAauthenticated : false, error : 'Input Your Credentials' }
    })
)

export const select_Auth = createFeatureSelector<AuthState>('auth');

export const select_isloggedin$ =  createSelector(
    select_Auth,
    (state) => state.isAauthenticated
)

export const select_isloggedout$ =  createSelector(
    select_Auth,
    (state) => !state.isAauthenticated
)

export const select_userid$ =  createSelector(
    select_Auth,
    (state) => (state.user)  ? state.user.userid : null
)

export const select_username$ =  createSelector(
    select_Auth,
    (state) => (state.isAauthenticated)  ? state.user.username : null
)

export const select_error$ =  createSelector(
    select_Auth,
    (state) => state.error
)
