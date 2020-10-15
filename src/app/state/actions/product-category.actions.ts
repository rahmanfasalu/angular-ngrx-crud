import { createAction, props } from "@ngrx/store";
import { Category } from "../../interfaces/products";

export const loadCategories = createAction("[Category] Load");

export const loadCategorySuccess = createAction(
  "[CAtegory] Load Success",
  props<{ categories: Category[] }>()
);
