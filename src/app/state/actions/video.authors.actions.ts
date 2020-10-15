import { createAction, props } from "@ngrx/store";
import { AuthorEntities } from "src/app/interfaces/products";

export const loadAuthors = createAction("[Authors] Load");
export const loadAuthorsSuccess = createAction(
  "[Authors] Load Success",
  props<{
    authors: AuthorEntities;
  }>()
);
