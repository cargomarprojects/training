import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.services';
import { iuser } from '../models/iuser';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-user-list',
    templateUrl: 'user-list.component.html'
})

export class UserListComponent implements OnInit {

    list$: Observable<iuser[]>;

    searchstring = '';

    constructor(
        private service: UserService
    ) { }

    ngOnInit() {
        this.list();
    }

    list() {
        this.list$ = this.service.List(this.searchstring);
    }

}