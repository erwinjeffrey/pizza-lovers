import { AuthService } from './../auth/auth.service';
import { Recipe } from './../recipes/recipe.model';
import { HttpClient, HttpParams, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RecipeService } from '../recipes/recipe.service';
import { map } from 'rxjs/operators';

@Injectable()
export class DataStorageService {
  url = 'https://ng-recipe-book-6bf67.firebaseio.com/recipes.json';
  //url = 'https://ng-recipe-book-6bf67.firebaseio.com/recipes.json?auth=';

  constructor(
    private http: HttpClient,
    private recipeService: RecipeService,
    private authService: AuthService
  ) {}
  recipes: Recipe[];
  storeRecipes() {
    // const token = this.authService.getToken();
    // return this.http.put(this.url, this.recipeService.getRecipes(),{
    //   observe: 'body', // listen to event(you can detect if it was a sent event o  get)
    //   params: new HttpParams().set('auth',token)
    //  // headers: new HttpHeaders().set('Authorization', 'Bearer lalalala') // example of sending header
    // });

    //listen to the progress of this request
    const req = new HttpRequest(
      'PUT',
      this.url,
      this.recipeService.getRecipes(),
      { reportProgress: true }
    );
    return this.http.request(req);
  }

  getStoreRecipes() {
    //const token = this.authService.getToken();
    // send the request with the token to recognize that the user is login (auth=)
    this.http
      .get<Recipe[]>(this.url)
      .pipe(
        map(recipes => {
          for (let recipe of recipes) {
            if (!recipe['ingredients']) {
              recipe['ingredients'] = [];
            }
          }
          return recipes;
        })
      )

      .subscribe((recipes: Recipe[]) => {
        this.recipeService.setRecipes(recipes);
      });
  }
}
