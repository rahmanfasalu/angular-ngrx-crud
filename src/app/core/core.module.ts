import { ErrorHandler, NgModule, Optional, SkipSelf } from "@angular/core";
import { CommonModule } from "@angular/common";

import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { throwIfAlreadyLoaded } from "./module-import-guard";

import { ErrorInterceptor, JwtInterceptor } from "./interceptors";

const INTERCEPTORS = [
  { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
];

const IMPORT_MODULES: any[] = [HttpClientModule];

let PRODUCTION_ONLY_PROVIDER: any[] = [];
if (environment.production) {
  // just to ensure PRODUCTION_ONLY_PROVIDER is available, Always add your dev tools here
  PRODUCTION_ONLY_PROVIDER = [...PRODUCTION_ONLY_PROVIDER];
}

/**
 * CoreModule
 * Only for Core components and services
 * Do not specify Pipes, Directives and everything that need to be imported into other modules rather then appModule.
 * This Module intend to keep all Services which are singleton and they don't have to instantiate twice!
 */
@NgModule({
  declarations: [],
  imports: [...IMPORT_MODULES],
  exports: [],
  providers: [...PRODUCTION_ONLY_PROVIDER, ...INTERCEPTORS],
})

// Guards against creating multiple instances of assets intended to be singletons.
// Make sure that this module is just imported in AppModule once.
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, "CoreModule");
  }
}
