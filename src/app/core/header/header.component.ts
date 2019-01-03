import { Store } from '@ngrx/store';
import  * as fromApp from  './../../store/app.reducers';
import * as fromAuth from '../../auth/ngrxStore/auth.reducers';
import { AuthService } from '../../auth/auth.service';
import { DataStorageService } from '../../shared/data.storage.service';
import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit{
  authState: Observable<fromAuth.State>;

  constructor(
    private dataStorageService: DataStorageService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit(){
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
    this.authService.logout();
    this.router.navigate(['/recipes'], { relativeTo: this.route });
    
  }
}
