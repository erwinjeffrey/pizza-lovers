import * as AuthActions from './../../auth/ngrxStore/auth.actions';
import { Store } from '@ngrx/store';
import * as fromApp from './../../store/app.reducers';
import * as fromAuth from '../../auth/ngrxStore/auth.reducers';
import { DataStorageService } from '../../shared/data.storage.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
  authState: Observable<fromAuth.State>;

  constructor(
    private dataStorageService: DataStorageService,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit() {
    this.authState = this.store.select('auth');
  }

  onSaveData() {
    this.dataStorageService.storeRecipes().subscribe(response => {
      console.log(response);
    });
  }
  onFechData() {
    this.dataStorageService.getStoreRecipes();
  }

  onLogout() {
    this.store.dispatch(new AuthActions.Logout());
  }
}
