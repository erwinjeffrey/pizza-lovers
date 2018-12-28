import { AppRoutingModule } from './../app.routing.module';
import { HomeComponent } from './core/../home/home.component';
import { HeaderComponent } from './core/../header/header.component';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { AuthService } from '../auth/auth.service';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { RecipeService } from '../recipes/recipe.service';
import { DataStorageService } from '../shared/data.storage.service';
import { RouterModule } from '@angular/router';

@NgModule({
    declarations: [
        HeaderComponent,
        HomeComponent
    ],
    imports: [
        SharedModule,
        AppRoutingModule,
        RouterModule
    ],
    exports: [
        AppRoutingModule,
        HeaderComponent,
        RouterModule
    ],
    providers: [ShoppingListService, RecipeService, DataStorageService, AuthService]
})
export class CoreModule { }