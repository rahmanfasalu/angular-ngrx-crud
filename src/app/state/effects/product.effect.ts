import { Injectable } from "@angular/core";
import { mergeMap, map, catchError, concatMap } from "rxjs/operators";
import { of } from "rxjs";

/* NgRx */
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { ProductService } from "../../services/product.service";
import { AuthorActions, CategoryActions, ProductApiActions } from "../actions";
import { Category } from "src/app/interfaces/products";
import { normalizeAuthorsData } from "../schema/author.schema";

@Injectable()
export class ProductEffects {
  constructor(
    private actions$: Actions,
    private productService: ProductService
  ) {}

  loadCategories$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CategoryActions.loadCategories),
      mergeMap(() =>
        this.productService.getCategories().pipe(
          map((categories: Category[]) => {
            return CategoryActions.loadCategorySuccess({
              categories: categories,
            });
          }),
          catchError((error) =>
            of(ProductApiActions.loadProductsFailure({ error }))
          )
        )
      )
    );
  });

  loadAuthors$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthorActions.loadAuthors),
      mergeMap(() =>
        this.productService.getAuthors().pipe(
          map((authors) =>
            AuthorActions.loadAuthorsSuccess(normalizeAuthorsData(authors))
          ),
          catchError((error) =>
            of(ProductApiActions.loadProductsFailure({ error }))
          )
        )
      )
    );
  });

  updateAuthors$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthorActions.updateAuthorVideos),
      mergeMap((action) =>
        this.productService.updateAuthorVideo(action.author).pipe(
          map((author) =>
            AuthorActions.updateAuthorVideosSuccess({ author: author })
          ),
          catchError((error) =>
            of(ProductApiActions.loadProductsFailure({ error }))
          )
        )
      )
    );
  });
}
