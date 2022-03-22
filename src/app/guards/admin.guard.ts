import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(
    private _router: Router,
    private _authService: AuthenticationService
  ){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
      const currentUserToken = this._authService.CurrentUserToken;
      if(!!currentUserToken){
      const currentUserRole = this._authService.getDecodedTokenInfoAboutUserRole()
        if(currentUserToken != null && currentUserRole.includes("SuperAdmin")){
            return true;
        }
      }

      this._router.navigate(["/home"])
      return false;
  }
}
