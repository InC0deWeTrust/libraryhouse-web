import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserServiceProxy, UpdateUserPasswordDto } from 'src/shared/service-proxies/service-proxies';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  public newUserPassword: UpdateUserPasswordDto;

  constructor(
    private _httpClient: HttpClient,
    private _userService: UserServiceProxy,
    private _router: Router,
    private _authService: AuthenticationService
  ) {
    this.newUserPassword = new UpdateUserPasswordDto;
   }

  ngOnInit(): void {
  }

  updateUserPassword(newUserPassword: UpdateUserPasswordDto){
    this._userService.updatePassword(newUserPassword).subscribe(result =>{
      alert("Updated Sucessfully!");
    });
    this._router.navigate(["/home"])
  }

  logOut(){
    debugger
    this._authService.logOut();
  }

}
