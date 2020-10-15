import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    request = request.clone({
      headers: request.headers.set('Content-Type', 'application/json'),
    });
    // request = request.clone({
    //   headers: request.headers.set(
    //     'Authorization',
    //     'token af78fea730cd5451e85985bca359be748d6f85ba'
    //   ),
    // });

    return next.handle(request);
  }
}
