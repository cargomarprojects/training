import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.store';
import { Router } from '@angular/router';
import { logout_action } from '../login/auth.store';

@Component({
    selector: 'app-header',
    templateUrl: 'header.component.html'
})

export class HeaderComponent implements OnInit {
    constructor(
        private store : Store<AppState>,
        private router : Router
    ) { }

    ngOnInit() { }


    logout(){
        this.store.dispatch(logout_action());
        this.router.navigate(['/login']);
    }
}