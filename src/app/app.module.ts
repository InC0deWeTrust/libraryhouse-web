import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ServiceProxyModule } from 'src/shared/service-proxies/service-proxy.module';
import { AppRoutingModule } from './app-routing.module';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from './helpers/jwt.interceptor';
import { ErrorInterceptor } from './helpers/error.interceptor';
import { JwtModule } from '@auth0/angular-jwt';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgxPaginationModule } from 'ngx-pagination';

//LH modules
import { GeneralModule } from './general/general.module';
import { AdminModule } from './admin/admin.module';
import { UserModule } from './user/user.module';
import { AppComponent } from './app.component';

//General components
import { AboutComponent } from './general/about/about.component';
import { AuthComponent } from './general/auth/auth.component';
import { HomeComponent } from './general/home/home.component';

//User components
import { AuthorsComponent } from './user/authors/authors.component';
import { ProfileComponent } from './user/profile/profile.component';
import { BooksComponent } from './user/books/books.component';

//Admin components
import { ControlPanelComponent } from './admin/control-panel/control-panel.component';
import { AdminBooksComponent } from './admin/books/books.component';
import { AdminRoleComponent } from './admin/role/role.component';
import { AdminUsersComponent } from './admin/users/users.component';

//Directives
import { PasswordMatchDirective } from './directives/password-match.directive';
import { SpinnerComponent } from './spinner/spinner.component';
import { SearchFilterPipe } from './pipes/search-filter.pipe';
import { SearchFilterAuthorsPipe } from './pipes/search-filter-authors.pipe';

export function tokenGetter(){
  return localStorage.getItem("access_token");
}

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    AuthComponent,
    HomeComponent,
    AuthorsComponent,
    ProfileComponent,
    BooksComponent,
    ControlPanelComponent,
    AdminBooksComponent,
    AdminRoleComponent,
    AdminUsersComponent,
    PasswordMatchDirective,
    SpinnerComponent,
    SearchFilterPipe,
    SearchFilterAuthorsPipe
  ],
  imports: [
    BrowserModule,
    NgxSpinnerModule,
    NgxPaginationModule,
    AppRoutingModule,
    ServiceProxyModule,
    IonicModule.forRoot(),
    FormsModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter
      }
    })
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
