/* NgRx */
import { createReducer, on } from "@ngrx/store";
import { EntityState, EntityAdapter, createEntityAdapter } from "@ngrx/entity";
import { CategoryActions } from "../actions";
import { Category } from "../../interfaces/products";

/* Extend Entity state */
export interface CategoryState extends EntityState<Category> {}
/* Adapter State */
export const adapter: EntityAdapter<Category> = createEntityAdapter<Category>();

/* Intialise State */
export const initialState: CategoryState = adapter.getInitialState();

// Category reducer
export const categoryReducer = createReducer<CategoryState>(
  initialState,
  on(
    CategoryActions.loadCategorySuccess,
    (state, { categories }): CategoryState => {
      return adapter.setAll(categories, state);
    }
  )
);
