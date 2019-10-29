import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalService } from './global.service';

import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class LoginService {

    constructor(
        private http: HttpClient,
        private gs: GlobalService
    ) { }


    login(userid: string, pwd: string) {
        const param = `userid=${userid}&pwd=${pwd}`;
        return this.http.get<any>(this.gs.url + "/user?" + param).pipe(
            map(e => (e.length > 0) ? e[0] : null)
        );
    }

}
