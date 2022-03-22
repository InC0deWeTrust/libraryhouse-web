import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Guards
import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';

//Components
import { AuthComponent } from './general/auth/auth.component';
import { HomeComponent } from './general/home/home.component';
import { AboutComponent } from './general/about/about.component';
import { BooksComponent } from './user/books/books.component';
import { AuthorsComponent } from './user/authors/authors.component';
import { ProfileComponent } from './user/profile/profile.component';
import { ControlPanelComponent } from './admin/control-panel/control-panel.component';
import { AdminBooksComponent } from './admin/books/books.component';
import { AdminUsersComponent } from './admin/users/users.component';
import { AdminRoleComponent } from './admin/role/role.component';

//Admin routes
const adminRoutes: Routes = [
  {
    path: 'books',
    component: AdminBooksComponent
  },
  {
    path: 'users',
    component: AdminUsersComponent
  },
  {
    path: 'roles',
    component: AdminRoleComponent
  }
]

const routes: Routes = [
  //Default routes
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'auth',
    component: AuthComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'about',
    component: AboutComponent
  },

  //Admin route
  {
    path: 'admin',
    component: ControlPanelComponent,
    canActivate: [AdminGuard],
    children: adminRoutes
  },
  // {
  //   path: 'admin/books',
  //   component: AdminBooksComponent,
  //   canActivate: [AdminGuard]
  // },
  // {
  //   path: 'admin/users',
  //   component: AdminUsersComponent,
  //   canActivate: [AdminGuard]
  // },
  // {
  //   path: 'admin/roles',
  //   component: AdminRoleComponent,
  //   canActivate: [AdminGuard]
  // },

  //User routes
  {
    path: 'books',
    component: BooksComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'authors',
    component: AuthorsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard]
  },

  //Default route if none is found
  {
    path: '**',
    redirectTo: 'home'
    // pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
