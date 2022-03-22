import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { AuthenticationService } from '../services/auth.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(
    private _authService: AuthenticationService
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<any>> {
    const isLoggedIn = this._authService.isAuth();
    const isApiUrl = request.url.startsWith(environment.appBaseUrl);
    if(isLoggedIn && isApiUrl){
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this._authService.CurrentUserToken}`
        }
      });
    }

    return next.handle(request);
  }
}