import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AuthorEntities, Video } from "../interfaces/products";

import * as AppState from "./app.state";
import {
  CategoryState,
  categoryReducer,
} from "./reducer/product.category.reducer";

import { authorsReducer } from "./reducer/product.author.reducer";

export const reducers = {
  categories: categoryReducer,
  authors: authorsReducer,
};

export interface ProductsModuleState {
  categories: CategoryState;
  authors: AuthorEntities;
}

// Extends the app state to include the product feature.
// This is required because products are lazy loaded.
// So the reference to ProductState cannot be added to app.state.ts directly.
export interface State extends AppState.State {
  products: ProductsModuleState;
}

// Selector functions
const getProductFeatureState = createFeatureSelector<ProductsModuleState>(
  "products"
);

// Category slice
export const selectAllCategories = createSelector(
  getProductFeatureState,
  (state: ProductsModuleState) => state.categories
);

// Authors slice
export const selectAllAuthors = createSelector(
  getProductFeatureState,
  (state: ProductsModuleState) => state.authors
);

// Authors slice
export const selectCurrentVideo = createSelector(
  getProductFeatureState,
  (state: ProductsModuleState, { id }: { id: number }): Video => {
    if (state?.authors?.entities?.videos) {
      return state?.authors?.entities?.videos[`${id}`];
    }
    return null;
  }
);
