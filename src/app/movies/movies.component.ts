import { Component, Input, OnInit } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { AddMovieComponent } from '../add-movie/add-movie.component';
import { AuthenticationService } from '../_services/authentication.service';
import { MovieService } from '../_services/movie.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {
  @Input() name: string;
  modalReference: NgbModalRef;
  movies: any[] = [];
  categories: any[] = [];
  moviesByCategory: any[] = [];
  isError: boolean = false;
  isLoding: boolean = true;
  currentCategory: any;
  errMsg: string = "";
  
  constructor(private modalService: NgbModal, 
    private movieService: MovieService, 
    private authenticationService: AuthenticationService) { }

  ngOnInit(): void {

    this.getMovies();
    this.getCategory();
  }

  getMovies() {

    this.movieService.getMovies().subscribe(data =>{
      this.movies = data.result;
      this.movieService.movies = this.movies;
      if(this.categories?.length == 0){
        this.isError = true;
      }
      else{
        this.isError = false;
      }
      this.isLoding = false;
    }, error => {
      this.isError = true;
      this.isLoding = false;
    });

  }

  getCategory() {
    
      this.movieService.getCategory().subscribe(data =>{
        this.categories = data.result;
        this.movieService.categoriesArr = this.categories;
        if(this.categories?.length == 0){
          this.isError = true;
        }
        else{
          this.isError = false;
        }
      }, error => {
        this.isError = true;
      });
   }

  getMoviesByCategory(category: any){

    this.currentCategory = category;
    this.moviesByCategory = this.movies.filter(movie => movie.category == category.categoryName);

  }

  async addMovie(){
    this.modalReference = this.modalService.open(AddMovieComponent, {backdrop: 'static',size: 'lg', keyboard: false, centered: true});
    let data =  await this.modalReference.result;
      if(data!= true){
        this.movies = this.movieService.movies;
        this.getMoviesByCategory(this.currentCategory);
      }
  }
  

  isExistsMovies(category: any): boolean{
    if(this.movies.filter(movie => movie.category == category.categoryName).length == 0)
      return false;
    return true;

  }

  logout() {
    this.authenticationService.logout();
  }

  deleteMovie(movieId: string) {
    if(this.currentCategory){
      this.movies = this.movies.filter(movie => movie.movieId != movieId);
      this.movieService.movies = this.movies;
      this.moviesByCategory = this.movies.filter(movie => movie.category == this.currentCategory.categoryName && movie.movieId != movieId);
    }
  }

  checkError(errMsg: string){
    if(errMsg)
    {
      this.errMsg = errMsg;
    }
    else{
      this.errMsg = "";
    }
  }

  close() {
    this.errMsg = "";
  }

}
