import { Recipe } from '../recipe.model';
import { Ingredient } from '../../shared/ingredient.model';
import * as RecipeActions from './recipe.actions';
import * as fromApp from '../../store/app.reducers';

export interface FeatureState extends fromApp.AppState {
  recipes: State;
}

export interface State {
  recipes: Recipe[];
}

const initialState: State = {
  recipes: [
    new Recipe(
      'Vege Pizza',
      'Vegetable Pizza',
      'https://www.dondeir.com/wp-content/uploads/2016/12/rodizio-pizzas-b.jpg',
      [new Ingredient('Tomatoes', 10), new Ingredient('Onions', 3)]
    ),
    new Recipe(
      'Pizza do brazil',
      'pizza cake do brazil',
      'https://www.dondeir.com/wp-content/uploads/2016/07/pizzabuffet.jpg',
      [new Ingredient('Cheese', 12), new Ingredient('Chiken', 1)]
    )
  ]
};

export function recipeReducer(
  state = initialState,
  action: RecipeActions.RecipeActions
) {
  switch (action.type) {
    case RecipeActions.SET_RECIPES:
      return {
        ...state,
        recipes: [...action.payload]
      };

    case RecipeActions.ADD_RECIPE:
      return {
        ...state,
        recipes: [...state.recipes, action.payload]
      };

    case RecipeActions.UPDATE_RECIPE:
      const recipe = state.recipes[action.payload.index];
      const updateRecipe = {
        ...recipe,
        ...action.payload.updateRecipe
      };
      const recipes = [...state.recipes];
      recipes[action.payload.index] = updateRecipe;
      return {
        ...state,
        recipes: recipes
      };

    case RecipeActions.DELETE_RECIPE:
      const oldRecipes = [...state.recipes];
      oldRecipes.splice(action.payload, 1);
      return {
        ...state,
        recipes: oldRecipes
      };
    default:
      return state;
  }
}
