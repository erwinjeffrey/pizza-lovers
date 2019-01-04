import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as shoppingListActions from '../../shopping-list/ngrxStore/shopping-list.actions';
import * as fromRecipe from '../ngrxStore/recipe.reducers';
import { Observable } from 'rxjs/Observable';
import * as RecipeActions from './../ngrxStore/recipe.actions';


@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipeState: Observable<fromRecipe.State>;
  id: number;

  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromRecipe.FeatureState>
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.recipeState = this.store.select('recipes');
    });
  }

  onAddToShoppingList() {
    this.store.select('recipes')
      .take(1)
      .subscribe((recipeState: fromRecipe.State) =>{
        this.store.dispatch(new shoppingListActions.AddIngredients(
          recipeState.recipes[this.id].ingredients)
          )
      })
  }

  onEditRecipe() {
    this.router.navigate(['edit'], { relativeTo: this.route });
    //in case we did nt have the id
    //this.router.navigate(['../',this.id, 'edit'], { relativeTo: this.route });
  }

  onDeleteRecipe() {
   this.store.dispatch(new RecipeActions.DeleteRecipe(this.id));
    this.router.navigate(['/recipes']);
  }
}
