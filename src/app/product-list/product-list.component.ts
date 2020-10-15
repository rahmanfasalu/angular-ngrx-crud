import { Component, Input, OnInit } from "@angular/core";
import { AuthorEntities } from "../interfaces/products";
import { CategoryState } from "../state/reducer/product.category.reducer";

@Component({
  selector: "app-product-list",
  templateUrl: "./product-list.component.html",
  styleUrls: ["./product-list.component.scss"],
})
export class ProductListComponent implements OnInit {
  videos: any;
  authors: any;
  @Input() categories: CategoryState;
  @Input() authorEntity: any;
  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(): void {
    this.videos = this.authorEntity?.entities?.videos;
    this.authors = this.authorEntity?.entities.authors;
  }
}
