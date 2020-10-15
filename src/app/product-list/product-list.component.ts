import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { CategoryActions } from "../state/actions";
import { CategoryState } from "../state/reducer/product.category.reducer";

import { State, selectAllCategories } from "../state/index";
@Component({
  selector: "app-product-list",
  templateUrl: "./product-list.component.html",
  styleUrls: ["./product-list.component.scss"],
})
export class ProductListComponent implements OnInit {
  categories$: Observable<CategoryState>;
  constructor(private store: Store<State>) {}

  ngOnInit(): void {
    // Do NOT subscribe here because it uses an async pipe
    // This gets the initial values until the load is complete.
    this.categories$ = this.store.select(selectAllCategories);

    this.categories$.subscribe((data) => console.log(data));
    // dispatch action to load categories and authors.
    this.store.dispatch(CategoryActions.loadCategories());
  }
}
