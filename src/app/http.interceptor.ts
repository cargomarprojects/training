
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable, noop } from 'rxjs';

@Injectable({providedIn: 'root'})
export class HttpInterceptorService implements HttpInterceptor {
    total_calls = 0;

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        if ( this.total_calls == 0)
            noop;
            
        this.total_calls++;

        return next.handle(req);

    }
}