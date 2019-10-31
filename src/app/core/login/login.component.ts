import { Component, OnInit, OnDestroy } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.store';
import { login_action, select_username$, select_userid$, select_error$ } from './auth.store';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-login',
    templateUrl: 'login.component.html'
})

export class LoginComponent implements OnInit, OnDestroy {
    message = 'Enter Credentials';
    userid = '';
    pwd = '';

    sub : any;

    login_error$ : Observable<string>;

    constructor(
        private mainservice: LoginService,
        private router: Router,
        private store: Store<AppState>
    ) {
        this.login_error$ = this.store.select(select_error$);
        this.sub = this.store.select(select_userid$).subscribe(
            e => {
                this.userid = e;
                this.pwd = e;
            }
        );

    }

    ngOnInit() { }

    ngOnDestroy(){
        this.sub.unsubscribe();
    }


    login() {
        this.message = 'Pls wait while login';
        this.store.dispatch(login_action({ userid : this.userid, pwd : this.pwd  }))

        /*
        this.mainservice.login(this.userid, this.pwd).subscribe(
            res => {
                if (res) {
                    this.message = 'Login Success';
                    const user = { id: res.id, userid: res.userid, username: res.username };
                    this.store.dispatch(login_action({ user: user }))
                    this.router.navigate(['/home']);
                }
                else {
                    this.message = 'Login Error';
                }
            },
            err => {
                this.message = err.message;
            }
        );
        */

    }
    cancel() {
        this.userid = '';
        this.pwd = '';
        this.message = 'Enter Credentials';
    }
}