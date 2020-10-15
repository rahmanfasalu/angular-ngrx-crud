import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { AuthorActions, CategoryActions } from "../state/actions";
import { CategoryState } from "../state/reducer/product.category.reducer";

import { State, selectAllCategories, selectAllAuthors } from "../state";
import { Author, AuthorEntities, Video } from "../interfaces/products";
@Component({
  selector: "app-product-shell-list",
  templateUrl: "./product-list-shell.component.html",
})
export class ProductListShellComponent implements OnInit {
  categories$: Observable<CategoryState>;
  authors$: Observable<AuthorEntities>;
  authors: AuthorEntities;
  categories: CategoryState;
  constructor(private store: Store<State>) {}

  ngOnInit(): void {
    // Do NOT subscribe here because it uses an async pipe
    // This gets the initial values until the load is complete.
    this.categories$ = this.store.select(selectAllCategories);
    this.authors$ = this.store.select(selectAllAuthors);

    this.categories$.subscribe((data) => (this.categories = data));
    this.authors$.subscribe((data) => {
      this.authors = data;
    });

    // dispatch action to load categories and authors.
    this.store.dispatch(CategoryActions.loadCategories());
    this.store.dispatch(AuthorActions.loadAuthors());
  }

  deleteProduct(video: Video): void {
    const author = this.authors.entities.authors[video.author];
    const updatedVideoList = author.videosList.filter(function (item: Video) {
      return item.id != video.id;
    });

    const updatedObject: Author = {
      id: author.id,
      name: author.name,
      videos: updatedVideoList,
    };

    this.store.dispatch(
      AuthorActions.updateAuthorVideos({ author: updatedObject })
    );
  }
}
