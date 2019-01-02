import * as ShoppingListActions from './shopping-list.actions'
import { Ingredient } from 'src/app/shared/ingredient.model';


// if no value is defined,this is our default
const initialState = {
    ingredient:[
        new Ingredient('Apples', 5),
        new Ingredient('Tomatoes', 10)
      ]
};

export function shoppingListReducer(state = initialState, action: ShoppingListActions.shoppingListActions){
    switch(action.type){
      case ShoppingListActions.ADD_INGREDIENT:
          return {
              ...state,
              ingredients: [...state.ingredient, action.payload]
          }
      default:
         return state;
    }
}