import { DataStorageService } from './../shared/data.storage.service';
import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  constructor(private dataStorageService: DataStorageService){}

  @Output() featureSelected = new EventEmitter<string>();
  onSelect(feature:string){
    this.featureSelected.emit(feature);
  }
  onSaveData(){
    this.dataStorageService.storeRecipes()
    .subscribe(
      (response: Response) =>{
        console.log(response);
    });
  }
  onFechData(){
    this.dataStorageService.getStoreRecipes();
  }
}
