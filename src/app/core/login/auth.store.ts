import { createAction, props, State , Action, createReducer,on, createFeatureSelector, createSelector } from '@ngrx/store';
import { Iuser } from 'src/app/models/iuser';

export interface AuthState{
    user: Iuser;
    isAauthenticated : boolean;
}

export const login_action = createAction('[LOGIN SCREEN] LOGIN', props<{user : Iuser }>());
export const logout_action = createAction('[LOGIN SCREEN] LOGOUT');


export const initialState : AuthState = {
    user : undefined,
    isAauthenticated : false
}

export function Reducer( state : AuthState , action : Action  ) : AuthState{
    return AuthReducer(state,action);
}

export const AuthReducer = createReducer(
    initialState,
    on(login_action, (state, action) =>{
        return {
            user : action.user ,
            isAauthenticated : true
        }
    }),
    on(logout_action, (state, action) =>{
        return {
            user : undefined,
            isAauthenticated : false
        }
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

export const select_username$ =  createSelector(
    select_Auth,
    (state) => (state.isAauthenticated)  ? state.user.username : null
)
