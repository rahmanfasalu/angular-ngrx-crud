import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { ProductListComponent } from "./product-list/product-list.component";
import { ProductEditComponent } from "./product-edit/product-edit.component";
import { MenuComponent } from "./shared/menu.component";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { AboutUsComponent } from "./about-us/about-us/about-us.component";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { environment } from "../environments/environment";

import { ProductEffects } from "./state/effects/product.effect";
import { CoreModule } from "./core/core.module";
import { reducers } from "./state";
@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ProductEditComponent,
    MenuComponent,
    AboutUsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    CoreModule,
    StoreModule.forRoot({}, {}),
    EffectsModule.forRoot([]),
    StoreModule.forFeature("products", reducers),
    EffectsModule.forFeature([ProductEffects]),
    StoreDevtoolsModule.instrument({
      name: "Angular ngrx sample app",
      maxAge: 25,
      logOnly: environment.production,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
