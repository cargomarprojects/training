import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from './app.store';
import { select_isloggedout$, select_isloggedin$ } from './core/login/auth.store';


@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {
    constructor(
        private store : Store<AppState>,
        private router: Router
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if ( state.url == '/login' )
            return this.store.select(select_isloggedout$);
        else            
            return this.store.select(select_isloggedin$);
    }
}