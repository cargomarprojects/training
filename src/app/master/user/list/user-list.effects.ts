import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { LOAD_REQUEST_ACTION, LOAD_SUCCESS_ACTION, LOAD_FAIL_ACTION } from './user-list.store';
import { UserService } from '../../services/user.services';
import { switchMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class UserListEffect {

    constructor(
        private actions$ : Actions,
        private service : UserService
    ) { }

    LoadRequestEffect$ = createEffect( () => this.actions$.pipe(
        ofType(LOAD_REQUEST_ACTION),
        switchMap ( evt => this.service.List(evt.searchstring).pipe(
            map ( result =>{
                if  (result ) 
                    return LOAD_SUCCESS_ACTION({userlist : result, searchString : evt.searchstring })
                else 
                    return LOAD_FAIL_ACTION({error :'No Recrods Found'})
            }),
            catchError ( (Err) => of(LOAD_FAIL_ACTION({error :'Http Error' }))  )
        ))
    ),{dispatch:true});

}