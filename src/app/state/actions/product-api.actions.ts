/* NgRx */
import { createAction, props } from "@ngrx/store";

export const loadProductsFailure = createAction(
  "[Product API] Load Fail",
  props<{ error: string }>()
);
