import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthorEntities, Video } from "../../interfaces/products";
import { CategoryState } from "../../state/reducer/product.category.reducer";

@Component({
  selector: "app-product-list",
  templateUrl: "./product-list.component.html",
  styleUrls: ["./product-list.component.scss"],
})
export class ProductListComponent implements OnInit {
  @Input() categories: CategoryState;
  @Input() authorEntity: any;
  @Output() delete = new EventEmitter<Video>();
  videos: any;
  authors: any;
  constructor(private route: Router) {}

  ngOnInit(): void {
    this.videos = this.authorEntity?.entities?.videos;
    this.authors = this.authorEntity?.entities.authors;
  }

  ngOnChanges(): void {
    this.videos = this.authorEntity?.entities?.videos;
    this.authors = this.authorEntity?.entities.authors;
  }

  objectKeys(obj: any) {
    if (!!obj) {
      return Object.keys(obj);
    }
    return [];
  }

  getAuthorName(id: number) {
    if (!!this.authors) {
      return this.authors[id].name;
    }
    return "";
  }

  getCategoryName(cat: number) {
    if (!!this.categories) {
      return this.categories.entities[cat]?.name;
    }
    return "";
  }

  gotEditVideo(evt: any, key: number) {
    evt.stopPropagation();
    this.route.navigate(["edit", key]);
  }

  editVideo(evt: any, key: number) {
    evt.stopPropagation();
  }

  deleteVideo(evt: any, key: number) {
    evt.stopPropagation();
    const video = this.videos[key];
    this.delete.emit(video);
  }
}
