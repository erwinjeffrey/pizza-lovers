import { RecipeStartComponent } from './recipe-start/recipe-start.component';
import { NgModule } from '@angular/core';
import { RecipesComponent } from './recipes.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipeItemComponent } from './recipe-list/recipe-item/recipe-item.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RecipesRoutingModule } from './recipes-routing.module';
import { SharedModule } from '../shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { recipeReducer } from './ngrxStore/recipe.reducers';
import { EffectsModule } from '@ngrx/effects';
import { RecipeEffects } from './ngrxStore/recipe.effects';

@NgModule({
    declarations:[
        RecipesComponent,
        RecipeStartComponent,
        RecipeListComponent,
        RecipeEditComponent,
        RecipeDetailComponent,
        RecipeItemComponent
    ],
    imports:[
        CommonModule, //enable ngif and all those stuff
        ReactiveFormsModule,
        RecipesRoutingModule,
        SharedModule,
        //as we load the recipes feature lazily we do need to use forFeature to register our reducers instead of forRoot
        StoreModule.forFeature('recipes', recipeReducer),
        EffectsModule.forFeature([RecipeEffects])
    ]
})
export class RecipesModule{}