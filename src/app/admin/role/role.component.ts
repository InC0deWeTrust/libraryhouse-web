import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RoleServiceProxy, RoleDto, CreateRoleDto } from 'src/shared/service-proxies/service-proxies';

@Component({
  selector: 'app-role-admin',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss']
})
export class AdminRoleComponent implements OnInit {
  public roles: RoleDto[] | undefined;

  constructor(
    private _httpClient: HttpClient,
    private _roleService: RoleServiceProxy
  ) { }

  ngOnInit(): void {
    this._roleService.getAll().subscribe(result => {
      this.roles = result;
    })
  }

  public createNewRole(newRole: CreateRoleDto){
    this._roleService.create(newRole).subscribe(x =>
      window.location.reload()
    )
  }

  public updateRole(updatedRole: RoleDto){
    this._roleService.update(updatedRole).subscribe(x => 
      window.location.reload());
  }

  public deleteRole(roleId: number){
    this._roleService.delete(roleId).subscribe(x => 
      window.location.reload());
  }

}
