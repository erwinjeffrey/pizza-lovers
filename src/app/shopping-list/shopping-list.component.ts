import * as ShoppinglistActions from './ngrxStore/shopping-list.actions';
import * as fromApp from '../store/app.reducers';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { Ingredient } from '../shared/ingredient.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  shoppingListState: Observable<{ ingredients: Ingredient[] }>;

  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit() {
    this.shoppingListState = this.store.select('shoppingList');
  }
  onEditItem(index: number) {
    console.log('onEditing');
    this.store.dispatch(new ShoppinglistActions.StartEdit(index));
  }
}
