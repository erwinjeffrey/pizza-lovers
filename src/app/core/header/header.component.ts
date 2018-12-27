import { AuthService } from '../../auth/auth.service';
import { DataStorageService } from '../../shared/data.storage.service';
import { Component, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  constructor(private dataStorageService: DataStorageService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute) { }

  @Output() featureSelected = new EventEmitter<string>();
  onSelect(feature: string) {
    this.featureSelected.emit(feature);
  }

  isAuthenticated(){
    return this.authService.isAuthenticated();
  }
  onSaveData() {
    this.dataStorageService.storeRecipes()
      .subscribe(
        (response: Response) => {
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
