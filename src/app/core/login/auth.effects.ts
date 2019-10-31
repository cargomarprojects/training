import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { login_action, logout_action, login_success_action, login_fail_action } from './auth.store';
import { of } from 'rxjs';
import { tap, switchMap, map, catchError } from 'rxjs/operators';

import { LoginService } from '../../services/login.service';
import { Iuser } from '../../models/iuser';

@Injectable()
export class AuthEffects {

    constructor(
        private actions$: Actions,
        private service: LoginService,
        private router: Router
    ) { }

    loginEffect$ = createEffect( () => this.actions$.pipe(
        ofType(login_action),
        switchMap( (action) => this.service.login(action.userid, action.pwd).pipe(
            map ( data => {
                if ( data )  {
                    const user = <Iuser>{ id : data.id, userid : data.userid, username : data.username };
                    localStorage.setItem('token', JSON.stringify(user));
                    this.router.navigate(['/home']);
                    return login_success_action({ user });
                }  
                else 
                {
                    localStorage.removeItem("token");
                    return login_fail_action({error : 'Invalid Credentials'})
                }
            }),
            catchError ( err =>  {
                localStorage.removeItem("token");
                return of(login_fail_action({error: 'Http Error'})) 
            })
        ))
    ));

    logoutEffect$ = createEffect(() => this.actions$.pipe(
        ofType(logout_action),
        tap(actions => {
            sessionStorage.removeItem("token");
            this.router.navigate(['/login']);
        })
    ), { dispatch: false });

}

