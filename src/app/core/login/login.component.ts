import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-login',
    templateUrl: 'login.component.html'
})

export class LoginComponent implements OnInit {
    message = 'Enter Credentials';
    userid  = '';
    pwd = '';

    constructor() { }

    ngOnInit() { }


    login(){
        this.message = 'Pls wait while login'
        console.log ( this.userid, this.pwd);
    }
    cancel (){
        this.userid = '';
        this.pwd = '';
        this.message     = 'Enter Credentials';
    }
}