import { AuthModule } from './auth/auth.module';
import { ShoppingListModule } from './shopping-list/shopping-list.module';
import { AuthGuard } from './auth/auth-guard.service';
import { AuthService } from './auth/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app.routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ShoppingListService } from './shopping-list/shopping-list.service';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { RecipeService } from './recipes/recipe.service';
import { DataStorageService } from './shared/data.storage.service';
import { RecipesModule } from './recipes/recipes.module';
import { SharedModule } from './shared/shared.module';
import { HomeComponent } from './home/home.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent],

  imports: [
    BrowserModule,// include all the feature of the commonModule and many things else
    AppRoutingModule, 
    HttpClientModule,
    //just removed recipesModule to load it lazily instead of eargily(when the route is visited)
    SharedModule,
    ShoppingListModule,
    AuthModule
  ],
  providers: [ShoppingListService,RecipeService, DataStorageService,AuthService,AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule {}
