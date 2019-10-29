import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';

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
        private  router : Router
    ) { }

    ngOnInit() { }


    login(){
        this.message = 'Pls wait while login'

        this.mainservice.login(this.userid, this.pwd). subscribe(
            res =>{
                if ( res) {
                    this.message = 'Login Success';
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