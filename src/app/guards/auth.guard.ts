import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private _router: Router,
    private _authService: AuthenticationService
  ){}
  //currentUser != "" && 

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
      const currentUser = this._authService.CurrentUserToken as unknown as string;
      if(!!currentUser){
          return true;
      }

      this._router.navigate(['/auth'])
      return false;
  }
  
}
