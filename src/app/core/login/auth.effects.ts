import { Injectable } from '@angular/core';
import { Actions , createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs/operators';
import { login_action, logout_action } from './auth.store';

@Injectable()
export class AuthEffects {

    constructor(
        private actions$ : Actions
    ) { }

    loginEffect$ = createEffect( () => this.actions$.pipe(
        ofType(login_action),
        tap( actions => {
            sessionStorage.setItem("token", JSON.stringify(actions.user))
        })
    ), {dispatch:false});

    logoutEffect$ = createEffect( () => this.actions$.pipe(
        ofType(logout_action),
        tap( actions => {
            sessionStorage.removeItem("token")
        })
    ), {dispatch:false});


}