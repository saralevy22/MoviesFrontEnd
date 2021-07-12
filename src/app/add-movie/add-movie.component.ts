import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Movie } from '../_models/movie';
import { MovieService } from '../_services/movie.service';
import urlExist from "url-exist"

@Component({
  selector: 'app-add-movie',
  templateUrl: './add-movie.component.html',
  styleUrls: ['./add-movie.component.css']
})

export class AddMovieComponent implements OnInit {

  addMovieErr: boolean = false;
  movie: Movie;
  categories: any[] = [];
  categorySelect: string;
  errMsg: string = "";
  
  constructor(private activeModal: NgbActiveModal,
              private fb: FormBuilder,
              private movieService: MovieService) { }

  addMovieForm: FormGroup = new FormGroup({});
  movies: any[] = [];

  ngOnInit(): void {

    this.categories = this.movieService.categoriesArr;
    this.movies = this.movieService.movies;
    const reg = '(http|https):\/\/www.imdb.com\.*'
    const reg2 = '^https?://www.imdb.com(?:/[^/#?]+)+\.(?:jpg|gif|png)$';

    this.addMovieForm = this.fb.group({
      movieName: new FormControl('', [Validators.required, Validators.maxLength(30), this.isExistValidator(this.movies)]),
      movieUrl: ['', [Validators.required,  Validators.pattern(reg) /*,this.isUrlExistValidator()*/]],
      categry:['', [Validators.required]],
      posterUrl: ['', [Validators.required, Validators.pattern(reg2)/*,this.isUrlExistValidator()*/]]
    });
  }
 
  isExistValidator(movies: any[]): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
        if (control.value !== undefined && (movies.filter(movie => movie.movieName.toLowerCase() == control.value.toLowerCase()).length > 0)) {
            return { 'isExist': true };
        }
        return null;
    };
  }

  async urlExist(url: string) : Promise<boolean>{
    return await urlExist(url);
  }

  isUrlExistValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      if (control.value && control.value !== undefined){
        let x = this.urlExist(control.value).then(data =>{
          if(!data)
            return { 'urlNotExist': true };
          else
            return null;
        });
      }
      else
        return null;
    };
  }

  close(){
    this.activeModal.close();
  }

  get formControls(){
    return this.addMovieForm.controls;
  }

  submit(){

    if(this.addMovieForm.invalid == false){
        const id = this.getUniqueId(1);
        this.movie = new Movie(id,this.formControls.movieName.value, this.categorySelect, this.formControls.movieUrl.value, this.formControls.posterUrl.value, new Date());
        this.errMsg = "";

        this.movieService.addMovie(this.movie).subscribe(data =>{
          let a = data;
          this.movieService.movies.unshift(this.movie);
          this.activeModal.close();
        }, error => {
          this.errMsg = "ארעה שגיאה בהוספת הסרט";
        });
      }
  }

  cancel(){
    this.activeModal.close();
  }

  closeError() {
    this.errMsg = "";
  }

  getUniqueId(parts: number): string {

    const stringArr = [];
    for(let i = 0; i< parts; i++){
      // tslint:disable-next-line:no-bitwise
      const S4 = (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
      stringArr.push(S4);
    }
    return stringArr.join('-');
  }
}

