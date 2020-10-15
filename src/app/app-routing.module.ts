import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AboutUsComponent } from "./about-us/about-us/about-us.component";

import { ProductEditShellComponent } from "./product-edit/product-edit-shell.component";
import { ProductListShellComponent } from "./product-list/product-list-shell.component";

const appRoutes: Routes = [
  { path: "list", component: ProductListShellComponent },
  { path: "edit/:id", component: ProductEditShellComponent },
  { path: "about", component: AboutUsComponent },
  { path: "**", redirectTo: "list" },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
