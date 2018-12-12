import { ShoppingListService } from './../shopping-list/shopping-list.service';
import { Recipe } from './recipe.model';
import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
@Injectable()
export class RecipeService{
    recipeSelected = new EventEmitter<Recipe>();
    
    constructor(private shoppingListService: ShoppingListService){}

    private recipes: Recipe[] = [
        new Recipe(
          'A Test Recipe',
          'This is simply a test',
          'https://www.maxpixel.net/static/photo/1x/Meat-Power-Recipe-Food-Dishes-Pork-1459693.jpg',
          [
              new Ingredient('Meat',1),
              new Ingredient('French Fries',20)
          ]
        ),
        new Recipe(
          'A Test Recipe 2',
          'This is simply a test 2',
          'https://www.maxpixel.net/static/photo/1x/Meat-Power-Recipe-Food-Dishes-Pork-1459693.jpg',
          [
              new Ingredient('Buns',2),
              new Ingredient('Meat',1)
          ]
        )
      ];

      getRecipes(){
          return this.recipes.slice();//slice return an exact copy of the array
      }

      addIngredientsToShoppingList(ingredients: Ingredient[]){
        this.shoppingListService.addIngredients(ingredients);
      }
}