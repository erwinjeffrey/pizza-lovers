import { shoppingListActions } from './../ngrxStore/shopping-list.actions';
import * as ShoppingListActions from '../ngrxStore/shopping-list.actions';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { ShoppingListService } from './../shopping-list.service';
import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') slForm: NgForm;
  subscription: Subscription;
  editMode=false;
  editedItemIndex: number;
  editedItem: Ingredient;

  constructor(private shoppingListService: ShoppingListService,
    private store: Store<{shoppingList:{ ingredients:Ingredient[] }}>) { }

  ngOnInit() {
    this.subscription=this.shoppingListService.statedEditing.subscribe(
      (index:number) =>{
         this.editMode = true;
         this.editedItemIndex = index;
         this.editedItem = this.shoppingListService.getIngredient(index);
         this.slForm.setValue({
           name: this.editedItem.name,
           amount: this.editedItem.amount
         });
      }
    );
  }

  onSubmit(form: NgForm){
    const value = form.value;
    const newIngredient = new Ingredient(value.name,value.amount);
    if(this.editMode){
      this.store.dispatch(new ShoppingListActions.UpdateIngredient({index:this.editedItemIndex,ingredient:newIngredient}));
      //this.shoppingListService.updateIngredient(this.editedItemIndex, newIngredient);
    }else{ 
      //passing value to the store
      this.store.dispatch(new ShoppingListActions.AddIngredient(newIngredient));
      // this.shoppingListService.addIngredient(newIngredient);
    }
    this.editMode = false;
    form.reset();
  }

  onClear(){
    this.slForm.reset();
    this.editMode = false;
  }

  onDelete(){
    this.store.dispatch(new ShoppingListActions.DeleteIngredient(this.editedItemIndex));
    //this.shoppingListService.deleteIngredient(this.editedItemIndex);
    this.editMode = false;
    this.onClear();
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
