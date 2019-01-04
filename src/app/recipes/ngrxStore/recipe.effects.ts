import { HttpClient, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Recipe } from '../recipe.model';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';

import * as RecipeActions from '../ngrxStore/recipe.actions';
import * as fromRecipe from '../ngrxStore/recipe.reducers';
import { Store } from '@ngrx/store';


@Injectable()
export class RecipeEffects{
    url = 'https://ng-recipe-book-6bf67.firebaseio.com/recipes.json';
    @Effect()
    recipeFetch = this.actions$
      .pipe(
          ofType(RecipeActions.FETCH_RECIPES),
          switchMap((action: RecipeActions.FetchRecipes)=>{
              return this.httpClient.get<Recipe[]>(this.url,{
                  observe: 'body',
                  responseType: 'json'
              })
          }),
          map(
            (recipes) =>{
               console.log(recipes);
               for(let recipe of recipes){
                   if(!recipe['ingredients']){
                      recipe['ingredients'] = [];
                   }
               }
               return {
                   type: RecipeActions.SET_RECIPES,
                   payload: recipes
               };
            }
          
        )
      );

      @Effect({dispatch: false})
      recipeStore = this.actions$
         .pipe(
             ofType(RecipeActions.STORE_RECIPES),
             withLatestFrom(this.store.select('recipes')),
             switchMap(([action, state])=>{
                 const req = new HttpRequest('PUT',this.url,
                 state.recipes, {reportProgress: true});
                 return this.httpClient.request(req);
             })
         )

    constructor(private actions$: Actions, 
                private httpClient: HttpClient,
                private store: Store<fromRecipe.FeatureState>){}
}