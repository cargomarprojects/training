
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable, noop } from 'rxjs';
import { GlobalService } from './services/global.service';
import { map, finalize } from 'rxjs/operators';
import { Timeouts } from 'selenium-webdriver';

@Injectable({ providedIn: 'root' })
export class HttpInterceptorService implements HttpInterceptor {
    total_calls = 0;

    constructor(
        private gs: GlobalService
    ) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        if (this.total_calls == 0)
            this.gs.showWaitScreen();
        this.total_calls++;

        return next.handle(req).pipe(
            map(e => {
                if (e instanceof HttpResponse)
                    this.total_calls--;

                if (this.total_calls == 0)
                {
                    setTimeout(() => {
                        this.gs.hideWaitScreen();
                    }, 500);
                                        
                }
                    
                return e;
            }),
        )

    }
}
