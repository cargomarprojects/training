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

    /*
    loginEffect$ = createEffect( () => this.actions$.pipe(
        ofType(login_action),
        tap( actions => {
            sessionStorage.setItem("token", JSON.stringify(actions.user))
        })
    ), {dispatch:false});
    */

    logineffect$ = createEffect(() => this.actions$.pipe(
        ofType(login_action),
        switchMap( ( e : any) =>
            this.service.login(e.userid, e.pwd).pipe(
                map(res => {
                    if (res) {
                        const user = { id: res.id, userid: res.userid, username: res.username };
                        sessionStorage.setItem('token',JSON.stringify(user));
                        this.router.navigate(['/home']);
                        return login_success_action({ user }) ;
                    }
                    else {
                        if ( sessionStorage.getItem('token') )
                            sessionStorage.removeItem('token');
                        return  login_fail_action({ error: 'invlaid credentials' });
                    }
                }),
                catchError(e => { 
                    if ( sessionStorage.getItem('token') )
                        sessionStorage.removeItem('token');
                    return of(login_fail_action({ error: 'login http error' }))
                }
            )
        )
    )),{dispatch:true});

    logoutEffect$ = createEffect(() => this.actions$.pipe(
        ofType(logout_action),
        tap(actions => {
            sessionStorage.removeItem("token");
            this.router.navigate(['/login']);
        })
    ), { dispatch: false });

}

