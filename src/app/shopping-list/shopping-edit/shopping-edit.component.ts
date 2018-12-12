import { ShoppingListService } from './../shopping-list.service';
import { Component, OnInit, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('nameInput') nameInputRef: ElementRef;
  @ViewChild('amountInput') amountInputRef: ElementRef;
  
  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit() {
  }

  onAddItem(nameInput, amountInput){
    const ingName = this.nameInputRef.nativeElement.value;
    const ingAmount= this.amountInputRef.nativeElement.value;
    const newIngredient = new Ingredient(ingName,ingAmount);
    this.shoppingListService.addIngredient(newIngredient);
  }
}
