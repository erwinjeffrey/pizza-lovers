import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Recipe } from '../../recipe.model';
import { RecipeService } from '../../recipe.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {
  @Input('recipeItem') recipe:Recipe;

  constructor(private recipeService: RecipeService,
    private router:Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
  }

  onSelected(){
   // this.recipeService.recipeSelected.emit(this.recipe);
    this.router.navigate([this.recipe.name],{relativeTo: this.route});
  }

}
