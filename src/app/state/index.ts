import { createFeatureSelector, createSelector } from "@ngrx/store";

import * as AppState from "./app.state";
import {
  CategoryState,
  categoryReducer,
} from "./reducer/product.category.reducer";

export const reducers = {
  categories: categoryReducer,
};

export interface ProductsModuleState {
  categories: CategoryState;
}

// Extends the app state to include the product feature.
// This is required because products are lazy loaded.
// So the reference to ProductState cannot be added to app.state.ts directly.
export interface State extends AppState.State {
  productModule: ProductsModuleState;
}

// Selector functions
const getProductFeatureState = createFeatureSelector<ProductsModuleState>(
  "products"
);

export const selectAllCategories = createSelector(
  getProductFeatureState,
  (state: ProductsModuleState) => state.categories
);
