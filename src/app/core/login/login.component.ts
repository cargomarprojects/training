import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.store';
import { login_action } from './auth.store';

@Component({
    selector: 'app-login',
    templateUrl: 'login.component.html'
})

export class LoginComponent implements OnInit {
    message = 'Enter Credentials';
    userid  = '';
    pwd = '';

    constructor(
        private mainservice : LoginService,
        private  router : Router,
        private store : Store<AppState>
    ) { }

    ngOnInit() { }


    login(){
        this.message = 'Pls wait while login'

        this.mainservice.login(this.userid, this.pwd). subscribe(
            res =>{
                if ( res) {
                    this.message = 'Login Success';
                    const user = {id : res.id, userid : res.userid, username : res.username };
                    this.store.dispatch( login_action ({user: user}) )            
                    this.router.navigate(['/home']);
                }
                else 
                {
                    this.message =  'Login Error';
                }
            },
            err =>{
                this.message = err.message;
            }   
        );



    }
    cancel (){
        this.userid = '';
        this.pwd = '';
        this.message     = 'Enter Credentials';
    }
}