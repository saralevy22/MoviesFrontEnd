import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { MoviesComponent } from './movies/movies.component';
import { AddMovieComponent } from './add-movie/add-movie.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MovieService } from './_services/movie.service';
import { MovieDatailsComponent } from './movie-datails/movie-datails.component';
import { NotAuthorizedComponent } from './not-authorized/not-authorizedcomponent';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NotAuthorizedComponent,
    AdminComponent,
    MoviesComponent,
    AddMovieComponent,
    MovieDatailsComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule,
    FormsModule
  ],
  providers: [
    MovieService
  ],
  bootstrap: [AppComponent]

})
export class AppModule { }
