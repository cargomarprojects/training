import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.services';
import { iuser } from '../../models/iuser';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.store';
import { selectUserList, LOAD_REQUEST_ACTION } from './user-list.store';

@Component({
    selector: 'app-user-list',
    templateUrl: 'user-list.component.html'
})

export class UserListComponent implements OnInit {

    list$: Observable<iuser[]>;
    
    searchstring = '';

    constructor(
        private store : Store<AppState>
    ) { 
        this.list$ = this.store.select(selectUserList);
    }

    ngOnInit() {
     
    }
    search (){
        this.store.dispatch( LOAD_REQUEST_ACTION({searchstring : this.searchstring}));
    }


}