import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducers';
import * as fromAuth from '../auth/ngrxStore/auth.reducers';
import 'rxjs/add/operator/switchMap';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private store:Store<fromApp.AppState>) {}

  intercept(req: HttpRequest<any>,next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('Intercepted', req);
    // as requests are inmutable,we should create a copy of it and modify the copy
    
    return this.store.select('auth')
    .take(1)
      .switchMap((authState: fromAuth.State) =>{
        const copiedReq = req.clone({params: req.params.set('auth',authState.token)});
         //after intercepting let the request continues
        return next.handle(copiedReq);
      })
  }
}
