import { iuser } from '../../models/iuser';
import { UserListComponent } from './user-list.component';
import { Action } from '@ngrx/store';


export interface userState {
    loaded : boolean;
    userList : iuser[];
}

export const initialState : userState = {
    loaded : false,
    userList : []
}

export function userReducer ( state : userState , action : Action  ){
    return state;
}