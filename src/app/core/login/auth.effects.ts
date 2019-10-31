import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { login_action, logout_action, login_success_action, login_fail_action } from './auth.store';
import { LoginService } from 'src/app/services/login.service';

import { AppState } from 'src/app/app.store';
import { of } from 'rxjs';
import { tap, switchMap, map, catchError } from 'rxjs/operators';
import { Iuser } from '../../models/iuser';
import { Router } from '@angular/router';


@Injectable()
export class AuthEffects {

    constructor(
        private actions$: Actions,
        private service: LoginService,
        private router: Router
    ) { }


    logoutEffect$ = createEffect(() => this.actions$.pipe(
        ofType(logout_action),
        tap(actions => {
            sessionStorage.removeItem("token");
            this.router.navigate(['/login']);
        })
    ), { dispatch: false });

}

