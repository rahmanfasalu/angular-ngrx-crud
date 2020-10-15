/* NgRx */
import { createReducer, on } from "@ngrx/store";
import { AuthorEntityType, AuthorEntities } from "../../interfaces/products";
import { AuthorActions } from "../actions";

/* Intialise State */
export const initialState: AuthorEntityType = {
  entities: {},
  result: [],
};

// author reducer
export const authorsReducer = createReducer<AuthorEntities>(
  initialState,
  on(
    AuthorActions.loadAuthorsSuccess,
    (state, { authors }): AuthorEntities => {
      return { ...state, ...authors };
    }
  )
);
