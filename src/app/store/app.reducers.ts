import * as fromShoppingList from '../shopping-list/ngrxStore/shopping-list.reducers';
import * as fromAuth from '../auth/ngrxStore/auth.reducers';
import { ActionReducerMap } from '@ngrx/store';

export interface AppState {
   shoppingList: fromShoppingList.State;
   auth: fromAuth.State
}

export const reducers: ActionReducerMap<AppState> = {
    shoppingList: fromShoppingList.shoppingListReducer,
    auth: fromAuth.authReducer
}