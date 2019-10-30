import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalService } from 'src/app/services/global.service';
import { iuser } from '../models/iuser';
import { Observable } from 'rxjs';

@Injectable({providedIn:'root'})
export class UserService {

    constructor(
        private http: HttpClient,
        private gs : GlobalService
    ) { }

    List() {
        return this.http.get<iuser[]>(this.gs.url + "/user");
    }

}