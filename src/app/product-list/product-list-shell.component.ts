import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { AuthorActions, CategoryActions } from "../state/actions";
import { CategoryState } from "../state/reducer/product.category.reducer";

import { State, selectAllCategories, selectAllAuthors } from "../state";
import { AuthorEntities } from "../interfaces/products";
@Component({
  selector: "app-product-shell-list",
  templateUrl: "./product-list-shell.component.html",
})
export class ProductListShellComponent implements OnInit {
  categories$: Observable<CategoryState>;
  authors$: Observable<AuthorEntities>;

  constructor(private store: Store<State>) {}

  ngOnInit(): void {
    // Do NOT subscribe here because it uses an async pipe
    // This gets the initial values until the load is complete.
    this.categories$ = this.store.select(selectAllCategories);
    this.authors$ = this.store.select(selectAllAuthors);

    // dispatch action to load categories and authors.
    this.store.dispatch(CategoryActions.loadCategories());
    this.store.dispatch(AuthorActions.loadAuthors());
  }
}
