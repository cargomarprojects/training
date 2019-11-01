import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalService } from 'src/app/services/global.service';
import { iuser } from '../models/iuser';
import { Observable } from 'rxjs';
import { shareReplay, share, map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(
        private http: HttpClient,
        private gs: GlobalService
    ) { }

    List(searchstring: string) {
        return this.http.get<iuser[]>(this.gs.url + "/user?page=1&q=" + searchstring).pipe(
            map (e => (e.length > 0) ? e : null )
        )
    }
}