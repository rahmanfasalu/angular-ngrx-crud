import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { PRODUCT_LIST_COMPONENTS } from "./product-list";
import { PRODUCT_EDIT_COMPONENTS } from "./product-edit";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { AboutUsComponent } from "./about-us/about-us/about-us.component";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { environment } from "../environments/environment";
import { ProductEffects } from "./state/effects/product.effect";
import { CoreModule } from "./core/core.module";
import { reducers } from "./state";

import { SHARED_COMPONENTS } from "./shared/components";
import { SHARED_PIPES } from "./shared/pipes";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    ...PRODUCT_LIST_COMPONENTS,
    ...PRODUCT_EDIT_COMPONENTS,
    ...SHARED_COMPONENTS,
    ...SHARED_PIPES,
    AboutUsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    CoreModule,
    FormsModule,
    ReactiveFormsModule,
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
