import { iuser } from '../../models/iuser';
import { Action, createAction, props, createReducer,on, createFeatureSelector, createSelector } from '@ngrx/store';

export const LOAD_REQUEST_ACTION = createAction('[USER SCREEN] LOAD-REQUEST', props<{ searchstring : string}>());
export const LOAD_SUCCESS_ACTION = createAction('[USER SCREEN] LOAD-SUCCESS', props<{ userlist : iuser[], searchString : string}>());
export const LOAD_FAIL_ACTION = createAction('[USER SCREEN] LOAD-FAIL', props<{ error : string}>());

export interface userState {
    loaded : boolean;
    searchstring : string ;
    error : string ;
    userlist : iuser[];
}

export const initialState : userState = {
    loaded : false,
    searchstring : '',
    error : null,
    userlist : []
}

export function userReducer ( state : userState , action : Action  ){
    return reducer(state, action);
}

export const reducer = createReducer(
    initialState,
    on( LOAD_SUCCESS_ACTION, (state, action) =>{
        return {
            ...state, loaded : true, error : null, userlist: action.userlist, searchstring : action.searchString
        }
    }),
    on( LOAD_FAIL_ACTION, (state, action) =>{
        return {
            ...state, loaded : false, userlist : undefined, error : action.error
        }    
    })   
)


export const selectUserState = createFeatureSelector<userState>('userlist');

export const selectLoaded = createSelector(
    selectUserState,
    (state) => state.loaded
)
export const selectError = createSelector(
    selectUserState,
    (state) => state.error
)
export const selectUserList = createSelector(
    selectUserState,
    (state) => state.userlist
)

export const selectSearchString = createSelector(
    selectUserState,
    (state) => state.searchstring
)


