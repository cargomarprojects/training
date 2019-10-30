import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.services';
import { iuser } from '../models/iuser';
import { Observable } from 'rxjs';
import { startWith, delay } from 'rxjs/operators';

@Component({
    selector: 'app-user-list',
    templateUrl: 'user-list.component.html'
})

export class UserListComponent implements OnInit {

    list$: Observable<iuser[]>;
    constructor(
        private service: UserService
    ) {}

    ngOnInit() {
        this.list$ = this.service.List();
    }

    list() {

    }

}