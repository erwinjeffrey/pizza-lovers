import { Subscription } from 'rxjs';
import { Component, OnInit, Output, EventEmitter, Input, OnDestroy } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Recipe[];
  subscription: Subscription

  constructor(
    private recepeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.subscription=this.recepeService.recipesChanged
    .subscribe(
      (recipes: Recipe[]) =>{
        this.recipes = recipes;
      }
    );
    this.recipes = this.recepeService.getRecipes();
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  onNewRecipe() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }
}
