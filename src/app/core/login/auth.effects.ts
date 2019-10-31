import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { login_action, logout_action, login_success_action, login_fail_action } from './auth.store';
import { LoginService } from 'src/app/services/login.service';

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

    loginEffect$ = createEffect( () => this.actions$.pipe(
        ofType(login_action),
        switchMap( (action) => this.service.login(action.userid, action.pwd).pipe(
            map ( data => {
                if ( data )  {
                    const user = <Iuser>{ id : data.id, userid : data.userid, username : data.username };
                    sessionStorage.setItem('token', JSON.stringify(user));
                    this.router.navigate(['/home']);
                    return login_success_action({ user });
                }  
                else 
                {
                    sessionStorage.removeItem("token");
                    return login_fail_action({error : 'Invalid Credentials'})
                }
            }),
            catchError ( err =>  {
                sessionStorage.removeItem("token");
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

