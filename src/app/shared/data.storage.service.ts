import { AuthService } from './../auth/auth.service';
import { Recipe } from './../recipes/recipe.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RecipeService } from '../recipes/recipe.service';
import { map } from 'rxjs/operators'; 



@Injectable()
export class DataStorageService{
  url = 'https://ng-recipe-book-6bf67.firebaseio.com/recipes.json?auth=';

  constructor(private http:HttpClient, private recipeService: RecipeService,private authService: AuthService){}
  recipes: Recipe[];
  storeRecipes(){
    const token = this.authService.getToken();
    return this.http.put(this.url + token, this.recipeService.getRecipes());
  }

  getStoreRecipes(){
    const token = this.authService.getToken();
    // send the request with the token to recognize that the user is login (auth=)
    this.http.get(this.url + token)
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