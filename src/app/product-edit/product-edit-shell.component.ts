import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { AuthorActions, CategoryActions } from "../state/actions";
import { CategoryState } from "../state/reducer/product.category.reducer";

import {
  State,
  selectAllCategories,
  selectAllAuthors,
  selectCurrentVideo,
} from "../state";
import { Author, AuthorEntities, Video } from "../interfaces/products";
import { ActivatedRoute, Params } from "@angular/router";
import { FormGroup } from "@angular/forms";
@Component({
  selector: "app-product-shell-edit",
  templateUrl: "./product-edit-shell.component.html",
})
export class ProductEditShellComponent implements OnInit {
  categories$: Observable<CategoryState>;
  authors$: Observable<AuthorEntities>;
  authors: AuthorEntities;
  categories: CategoryState;
  selectedObservable$: Observable<Video>;
  selected: Video;

  constructor(
    private store: Store<State>,
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.selectedObservable$ = this.store.select(selectCurrentVideo, {
        id: params.id,
      });
    });
  }

  ngOnInit(): void {
    // Do NOT subscribe here because it uses an async pipe
    // This gets the initial values until the load is complete.
    this.categories$ = this.store.select(selectAllCategories);
    this.authors$ = this.store.select(selectAllAuthors);

    this.categories$.subscribe((data) => (this.categories = data));
    this.authors$.subscribe((data) => {
      this.authors = data;
    });

    this.selectedObservable$.subscribe((data) => (this.selected = data));

    // // dispatch action to load categories and authors.
    this.store.dispatch(CategoryActions.loadCategories());
    this.store.dispatch(AuthorActions.loadAuthors());
  }

  updateProduct({
    videoAuthor,
    videoName,
    videoCategories,
  }: {
    videoAuthor: string;
    videoName: string;
    videoCategories: string[];
  }): void {
    const prevID = this.selected.author;
    const currentAuthorId = +videoAuthor;
    const currentAuthor = this.authors.entities.authors[currentAuthorId];
    const previousAuthor = this.authors.entities.authors[prevID];

    const updatedVideo = this.createVideoObject(
      videoAuthor,
      videoName,
      videoCategories
    );

    // Edit Video
    if (!!this.selected) {
      if (prevID !== currentAuthorId) {
        // delete  video from previous owner
        let updatedVideoList = previousAuthor.videosList.filter(
          (item: Video) => {
            return item.id != this.selected.id;
          }
        );
        const updatedObject: Author = this.createAuthorObject(
          prevID,
          previousAuthor.name,
          updatedVideoList
        );

        // dispatch action to delete from previous owner
        this.store.dispatch(
          AuthorActions.updateAuthorVideos({ author: updatedObject })
        );
      }

      // update / add new video to the current author
      let updatedVideoList = currentAuthor?.videosList?.filter(
        (item: Video) => {
          console.log(item);
          return item.id != this.selected.id;
        }
      );

      // Add new video
      updatedVideoList.push(updatedVideo);
      const updatedObject: Author = {
        id: currentAuthorId,
        name: currentAuthor.name,
        videos: updatedVideoList,
      };
      this.store.dispatch(
        AuthorActions.updateAuthorVideos({ author: updatedObject })
      );
    } else {
      // Add new video
      console.log("gere");
      const updatedVideoList = currentAuthor.videosList;
      updatedVideoList.push(updatedVideo);
      const updatedObject: Author = this.createAuthorObject(
        currentAuthorId,
        currentAuthor.name,
        updatedVideoList
      );
      console.log("gere", updatedObject);
      this.store.dispatch(
        AuthorActions.updateAuthorVideos({ author: updatedObject })
      );
    }
  }

  // create author object
  createAuthorObject(id: number, name: string, videoList: Video[]): Author {
    return {
      id: id,
      name: name,
      videos: videoList,
    };
  }

  // create video object
  createVideoObject(
    videoAuthor: string,
    videoName: string,
    videoCategories: string[]
  ) {
    let [date, time] = new Date().toLocaleString("en-US").split(", ");
    let uniqid = Date.now();
    return {
      id: !!this.selected ? this.selected.id : uniqid,
      catIds: videoCategories.map(Number),
      name: videoName,
      formats: !!this.selected
        ? this.selected.formats
        : { one: { res: "1080p", size: 1000 } },
      releaseDate: !!this.selected ? this.selected.releaseDate : date,
    };
  }
}
