import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AboutUsComponent } from "./about-us/about-us/about-us.component";
import { ProductEditComponent } from "./product-edit/product-edit.component";
import { ProductListComponent } from "./product-list/product-list.component";

const appRoutes: Routes = [
  { path: "list", component: ProductListComponent },
  { path: "edit/:id", component: ProductEditComponent },
  { path: "about", component: AboutUsComponent },
  { path: "**", redirectTo: "list" },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
