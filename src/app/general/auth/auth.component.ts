import { Component, OnInit } from '@angular/core';
import { AuthDto, CreateUserDto, LoginDto } from 'src/shared/service-proxies/service-proxies';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from 'src/app/services/auth.service';
import { PasswordMatchDirective } from 'src/app/directives/password-match.directive';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  public authDto: AuthDto;
  public signInUser!: LoginDto;
  public signUpUser!: CreateUserDto;
  public testBool! : boolean

  constructor(
    private _authService: AuthenticationService,
    private _router: Router
  ) { 
    this.authDto = new AuthDto;
    this.signInUser = new LoginDto;
    this.signUpUser = new CreateUserDto;
    this.testBool = false;
  }

  ngOnInit(): void {
  }

  logIn(logInDto: LoginDto){
    this._authService.signIn(logInDto).subscribe(result => {
      this.authDto = result;
      this._router.navigate(["/home"])
    })
    if(this._authService.CurrentUserToken === ""){
      this.testBool = true;
    }
  }

  async signUp(signUpDto: CreateUserDto){
    await this._authService.signUp(signUpDto).toPromise();
    
    const newLoginDto = new LoginDto;
    newLoginDto.email = signUpDto.email;
    newLoginDto.password = signUpDto.password;

    await this._authService.signIn(newLoginDto).subscribe(result => {
      this.authDto = result;
      this._router.navigate(["/home"])
    })
  }

  logInAnimate(){
    document.getElementById("container")?.classList.add("right-panel-active");
  }

  signUpAnimate(){
    document.getElementById("container")?.classList.remove("right-panel-active");
  }
}
