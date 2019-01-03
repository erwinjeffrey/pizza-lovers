import 'rxjs/add/operators/map';
import 'rxjs/add/operators/switchMap';
import 'rxjs/add/operators/mergeMap';
import 'rxjs/add/operators/do';
import { fromPromise } from 'rxjs/observable/fromPromise';
import * as AuthActions  from './auth.actions';
import { Effect, Actions } from '@ngrx/effects'
import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Router } from '@angular/router';

//this is the place where we listen all the effects in our app
@Injectable()
export class AuthEffects {
    @Effect()
    authSignup = this.actions$
    .ofType(AuthActions.TRY_SIGNUP)
    .map((action: AuthActions.TrySignup)=>{
        return action.payload;
    })
    .switchMap((authData:{username: string, password: string})=>{
        return fromPromise(firebase.auth().createUserwithEmailAndPassword(authData.username,
            authData.password));
    })
    .switchMap(()=>{
        return fromPromise(firebase.auth().currentUser.getIdToken());
    })
    .mergeMap((token: string) =>{
        return [
            {
                type: AuthActions.SIGNUP
            },
            {
                type: AuthActions.SET_TOKEN,
                payload: token
            }
        ];
    });

    @Effect()
    authSignin = this.actions$
       .ofType(AuthActions.TRY_SIGNIN)
       .map((action: AuthActions.TrySigning) =>{
           return action.payload;
       })
       .switchMap((authData : {username: string, password: string}) =>{
         return fromPromise(firebase.auth().signInWithEmailAndPassword(authData.username,
            authData.password))
       })
       .switchMap(()=>{
           return fromPromise(firebase.auth().currentUser.getIdToken());
       })
       .mergeMap((token: string)=>{
           this.router.navigate(['/']);
           return [
               {
                   type: AuthActions.SIGNING
               },
               {
                   type: AuthActions.SET_TOKEN,
                   payload: token
               }
           ];
       });

       @Effect({dispatch: false})
       authLogout = this.actions$
       .ofType(AuthActions.LOGOUT)
       .do(()=>{
          this.router.navigate(['/']);
       })

    constructor(private actions$: Actions, private router: Router){}
}