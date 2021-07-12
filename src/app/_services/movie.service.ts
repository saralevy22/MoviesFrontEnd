import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Movie } from '../_models/movie';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  categories: Observable<any>;
  movies: any[] = [];
  categoriesArr: any[] = [];
  
  constructor(private http: HttpClient) { }
  
  deleteMovie(movieId: string) {
    return this.http.delete<any>("http://localhost:48469/api/movie?movieId=" + movieId);
  }

  addMovie(currentMovie: Movie) {
    const headers = { 'content-type': 'application/json'}  
    const body=JSON.stringify(currentMovie);
    console.log(body)
    return this.http.post("http://localhost:48469/api/movie", body,{'headers':headers})
  }

  getMovies(): Observable<any>  {
    return this.http.get<any>("http://localhost:48469/api/movies");
  }

  getCategory() {
    this.categories = this.http.get<any>("http://localhost:48469/api/categories");
    return this.categories;
  }
  
}