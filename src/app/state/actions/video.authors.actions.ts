import { createAction, props } from "@ngrx/store";
import { Author, AuthorEntities } from "src/app/interfaces/products";

export const loadAuthors = createAction("[Authors] Load");
export const loadAuthorsSuccess = createAction(
  "[Authors] Load Success",
  props<{
    authors: AuthorEntities;
  }>()
);

export const updateAuthorVideos = createAction(
  "[Update] update author videos",
  props<{
    author: Author;
  }>()
);

export const updateAuthorVideosSuccess = createAction(
  "[Update] update author videos success",
  props<{
    author: Author;
  }>()
);
