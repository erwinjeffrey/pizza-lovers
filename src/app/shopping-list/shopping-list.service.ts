import { Ingredient  } from '../shared/ingredient.model';
import { EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
export class ShoppingListService{
    ingredientsChanged = new Subject<Ingredient[]>();
    statedEditing = new Subject<number>();

    private ingredients: Ingredient[] = [
        new Ingredient('Apples', 5),
        new Ingredient('Tomatoes', 10)
      ];

  
    getIngredient(index: number){
      return this.ingredients[index];
    }


    updateIngredient(index: number, newIngredient: Ingredient){
       this.ingredients[index] = newIngredient;
       this.ingredientsChanged.next(this.ingredients.slice());
    }

    deleteIngredient(index: number){
      this.ingredients.splice(index,1);
      this.ingredientsChanged.next(this.ingredients.slice());
    }
}