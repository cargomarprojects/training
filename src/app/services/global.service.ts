import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({providedIn:'root'})
export class GlobalService {
    public url = 'http://localhost:3000';

    waitScreen$ = new BehaviorSubject(false);

    constructor() { }

    showWaitScreen()
    {
        this.waitScreen$.next(true);
    }

    hideWaitScreen()
    {
        this.waitScreen$.next(false);
    }

}