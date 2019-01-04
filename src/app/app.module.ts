import { AuthEffects } from './auth/ngrxStore/auth.effects';
import { reducers } from './store/app.reducers';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { AuthModule } from './auth/auth.module';
import { ShoppingListModule } from './shopping-list/shopping-list.module';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app.routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [AppComponent],

  imports: [
    BrowserModule, // include all the feature of the commonModule and many things else
    AppRoutingModule,
    HttpClientModule,
    //just removed recipesModule to load it lazily instead of eargily(when the route is visited)
    SharedModule,
    ShoppingListModule,
    AuthModule,
    CoreModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([AuthEffects]),
    StoreRouterConnectingModule,
    !environment.production ? StoreDevtoolsModule.instrument() : []
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
