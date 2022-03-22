import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserServiceProxy, UserDto} from 'src/shared/service-proxies/service-proxies';
import { RoleServiceProxy, RoleDto } from 'src/shared/service-proxies/service-proxies';

@Component({
  selector: 'app-users-admin',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class AdminUsersComponent implements OnInit {
  public user: UserDto | undefined;
  public users: UserDto[] | undefined;
  public roles: RoleDto[] | undefined;

  constructor(
    private _httpClient: HttpClient,
    private _userService: UserServiceProxy,
    private _roleService: RoleServiceProxy) {
      //this.user = new UserDto;
      //this.users = [];
     }

  ngOnInit(): void {
    this._userService.getAll().subscribe(result => {
      this.users = result;
    })

    this._roleService.getAll().subscribe(result => {
      this.roles = result
    })
  }

  public getUser(userId: number){
    this._userService.get(userId).subscribe(result => {
      this.user = result;
    })
  }

  public deleteUser(userId: number){
    this._userService.delete(userId).subscribe(x =>
      window.location.reload());
  }

  public assignRoleForUser(userId: number, roleId: number){
    this._userService.assignRoleForUser(userId, roleId).subscribe(x =>
      window.location.reload());
  }

  public unsignRoleForUser(userId: number, roleId: number){
    this._userService.unsignRoleForUser(userId, roleId).subscribe(x =>
      window.location.reload());
  }

}
