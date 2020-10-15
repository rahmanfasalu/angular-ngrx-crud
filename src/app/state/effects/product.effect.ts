import { Injectable } from "@angular/core";
import { mergeMap, map, catchError, concatMap } from "rxjs/operators";
import { of } from "rxjs";

/* NgRx */
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { JsonPipe } from "@angular/common";
import { ProductService } from "../../services/product.service";
import { CategoryActions, ProductApiActions } from "../actions";
import { Category } from "src/app/interfaces/products";

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
}
