import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import * as fromApp from '../../store/app.reducers';
import * as AuthActions from '../ngrxStore/auth.actions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit() {}

  onSigning(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;
    this.store.dispatch(
      new AuthActions.TrySigning({ username: email, password: password })
    );
  }
}
