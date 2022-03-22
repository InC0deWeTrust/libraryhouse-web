import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthDto,
   AuthServiceProxy, 
   CreateUserDto, 
   LoginDto,
   UserServiceProxy } from 'src/shared/service-proxies/service-proxies';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { JwtHelperService } from "@auth0/angular-jwt";


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private currentUserToken: BehaviorSubject<AuthDto>;
  private userToken: string | undefined | AuthDto;

  constructor(
    private _httpClient: HttpClient,
    private _authService: AuthServiceProxy,
    private _router: Router,
    private _cookieService: CookieService,
    private _jwtService: JwtHelperService,
    private _userService: UserServiceProxy
  ) { 
    this.currentUserToken = new BehaviorSubject<AuthDto>(_cookieService.get("UserToken") as unknown as AuthDto);
    this.userToken = this.currentUserToken.value;
  }

  public get CurrentUserToken(): string {
    return this.userToken as string;
  }
  
  public signIn(loginDto: LoginDto){
    return this._authService.login(loginDto)
    .pipe(map(userToken => {
      if(userToken){
        const token = JSON.stringify(userToken.token)
        const decodedToken = this._jwtService.decodeToken(token);
        this._cookieService.set("UserToken", token, decodedToken.exp, "/", document.domain, true, "Strict");
        this.currentUserToken.next(userToken);
        this.userToken = this.currentUserToken.value;
      }
      return userToken;
    }))
  }

  public signUp(newUserDto: CreateUserDto){
    return this._userService.create(newUserDto)
  }

  public logOut(){
    delete this.userToken;
    this._cookieService.delete("UserToken");
    this._router.navigate(["/auth"])
  }

  public isAuth(){
    const token = this._cookieService.get("UserToken") as unknown as AuthDto;
    if(token !== null){
      return true
    }
    return false;
  }

  public getDecodedTokenInfoAboutUserId(): number{
    const decodedToken = this._jwtService.decodeToken(this.currentUserToken.value as unknown as string)
    return decodedToken.sub;
  }

  public getDecodedTokenInfoAboutUserRole(): string{
    const decodedToken = this._jwtService.decodeToken(this.currentUserToken.value as unknown as string)
    return decodedToken.role;
  }

  public getDecodedTokenInfoAboutUserEmail(): string{
    const decodedToken = this._jwtService.decodeToken(this.currentUserToken.value as unknown as string)
    return decodedToken.email;
  }
}
