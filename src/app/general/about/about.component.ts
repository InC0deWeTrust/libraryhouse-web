import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  public isLoggedIn: boolean;

  constructor(
    private _authService: AuthenticationService,
    private _router: Router
  ) { 
    this.isLoggedIn = this._authService.isAuth();
  }

  ngOnInit(): void {
  }

}
