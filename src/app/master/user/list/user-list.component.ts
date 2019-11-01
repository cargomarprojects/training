import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.services';
import { iuser } from '../../models/iuser';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.store';
import { selectUserList, LOAD_REQUEST_ACTION, selectSearchString } from './user-list.store';

@Component({
    selector: 'app-user-list',
    templateUrl: 'user-list.component.html'
})

export class UserListComponent implements OnInit {

    list$: Observable<iuser[]>;
    searchstring$ : Observable<string>;

    constructor(
        private store : Store<AppState>
    ) { 
        this.list$ = this.store.select(selectUserList);
        this.searchstring$ = this.store.select(selectSearchString);
    }

    ngOnInit() {
     
    }
    search (searchString  : string){
        this.store.dispatch( LOAD_REQUEST_ACTION({searchstring : searchString}));
    }


}