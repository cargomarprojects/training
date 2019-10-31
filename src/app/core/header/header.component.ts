import { Component, OnInit } from '@angular/core';
import { Store,select } from '@ngrx/store';
import { AppState } from 'src/app/app.store';
import { Router } from '@angular/router';
import { logout_action, select_username$ } from '../login/auth.store';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-header',
    templateUrl: 'header.component.html'
})

export class HeaderComponent implements OnInit {

    username$ : Observable<string>;

    constructor(
        private store : Store<AppState>,
        private router : Router
    ) {
        this.username$ =  this.store.select( select_username$);
      
     }

    ngOnInit() { }


    logout(){
        this.store.dispatch(logout_action());
    }
}