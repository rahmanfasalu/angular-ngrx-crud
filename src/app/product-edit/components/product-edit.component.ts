import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Video } from "src/app/interfaces/products";
import { CategoryState } from "src/app/state/reducer/product.category.reducer";
import { map } from "rxjs/operators";

@Component({
  selector: "app-product-edit",
  templateUrl: "./product-edit.component.html",
  styleUrls: ["./product-edit.component.scss"],
})
export class ProductEditComponent implements OnInit {
  @Input() categories: any;
  @Input() authors: any;
  @Input() videos: any;
  @Input() selected: any;

  @Output() update = new EventEmitter<FormGroup>();

  title = "Add/Edit video";
  form: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnChanges() {
    if (!!this.selected) {
      this.form?.controls["videoName"].setValue(this.selected.name);
      this.form?.controls["videoAuthor"].setValue(this.selected.author);
      this.form?.controls["videoCategories"].setValue(
        this.selected.catIds.map(String)
      );
    }
  }
  ngOnInit() {
    this.form = this.formBuilder.group({
      videoName: ["", Validators.required],
      videoAuthor: ["", Validators.required],
      videoCategories: [[], Validators.required],
    });
  }

  get f() {
    return this.form.controls;
  }

  objectKeys(obj: any) {
    if (!!obj) {
      return Object.keys(obj);
    }
    return [];
  }

  onSubmit() {
    this.submitted = true;

    if (this.form.valid) {
      this.update.emit(this.form.value);
    }
  }
}
