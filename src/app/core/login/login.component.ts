import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.store';
import { login_action, select_error$, logout_action } from './auth.store';
import { Observable } from 'rxjs';


@Component({
    selector: 'app-login',
    templateUrl: 'login.component.html'
})

export class LoginComponent implements OnInit, OnDestroy {
    userid = '';
    pwd = '';
    login_error$ : Observable<string>;

    constructor(
        private store: Store<AppState>
    ) {
        this.login_error$ = this.store.select(select_error$);
    }

    ngOnInit() { }

    ngOnDestroy(){}

    login() {
      
        this.store.dispatch(login_action({ userid : this.userid, pwd : this.pwd  }))
    }
    cancel() {
        this.store.dispatch( logout_action());
    }
}
