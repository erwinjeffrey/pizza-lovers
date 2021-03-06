import { HomeComponent } from './core/home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'recipes', loadChildren:'./recipes/recipes.module#RecipesModule'},// lazy loading for recipes
  { path: 'shopping-list', component: ShoppingListComponent }

];
@NgModule({
  imports: [RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules})],// preloading code when using lazy loadind
})
export class AppRoutingModule {}
