import { Recipe } from './../recipes/recipe.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RecipeService } from '../recipes/recipe.service';
import { map } from 'rxjs/operators'; 



@Injectable()
export class DataStorageService{
  url = 'https://ng-recipe-book-6bf67.firebaseio.com/recipes.json';

  constructor(private http:HttpClient, private recipeService: RecipeService){}
  recipes: Recipe[];
  storeRecipes(){
    return this.http.put(this.url, this.recipeService.getRecipes());
  }

  getStoreRecipes(){
    this.http.get(this.url)
    .pipe(
      map(
        (response: Response) =>{
        const recipes : Recipe[]= Object.values(response);
        for(let recipe of recipes){
          if(!recipe['ingredients']){
            console.log(recipe);
            recipe['ingredients'] = [];
          }
        }
        return recipes;
      })
    )
 
    .subscribe(
      (recipes: Recipe[]) =>{
        this.recipeService.setRecipes(recipes);
      }
    );
  }
}