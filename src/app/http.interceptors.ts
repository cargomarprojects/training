
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, noop } from 'rxjs';
import { GlobalService } from './services/global.service';
import { map, finalize, catchError } from 'rxjs/operators';
import { Timeouts } from 'selenium-webdriver';

@Injectable({ providedIn: 'root' })
export class HttpInterceptorService implements HttpInterceptor {
    activeRequests: number = 0;

    skippUrls = [
        '/authrefresh',
    ];

    constructor(
        private gs: GlobalService
    ) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        let displayLoadingScreen = true;

        for (const skippUrl of this.skippUrls) {
            if (new RegExp(skippUrl).test(req.url)) {
                displayLoadingScreen = false;
                break;
            }
        }
        if (displayLoadingScreen) {
            if (this.activeRequests === 0) {
                this.gs.showWaitScreen();
            }
            this.activeRequests++;
            return next.handle(req).pipe(
                finalize(() => {
                    this.activeRequests--;
                    if (this.activeRequests === 0) {
                        this.gs.hideWaitScreen();
                    }
                })
            )
        } else {
            return next.handle(req);
        }
    }
}

