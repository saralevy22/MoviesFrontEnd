import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { MovieService } from '../_services/movie.service';

@Component({
  selector: 'app-movie-datails',
  templateUrl: './movie-datails.component.html',
  styleUrls: ['./movie-datails.component.css']
})
export class MovieDatailsComponent implements OnInit {
  @Input() movieId: string;
  @Input() movieName: string;
  @Input() category: string;
  @Input() imdbLink: string;
  @Input() imdbPosterLink: string;
  @Input() createDate: any;
  @Output() deleteMovie = new EventEmitter<string>();
  @Output() errMsg = new EventEmitter<string>();
  name = 'Set iframe source';
  imagePath ='https://www.imdb.com/title/tt0108052/mediaviewer/rm1610023168/';
  urlSafe: SafeResourceUrl;
  
  constructor(public sanitizer: DomSanitizer, private movieService: MovieService) { }

  ngOnInit(): void {
    // this.imdbPosterLink = "https://angular.io/api/router/RouterLink";
    this.urlSafe= this.sanitizer.bypassSecurityTrustResourceUrl(this.imdbPosterLink);
  }

  goToMovie(){
    window.open(this.imdbLink, '_blank');
  }

  deleteMovieFunc(){
    this.movieService.deleteMovie(this.movieId).subscribe(data =>{
            let a = data.result;
            this.deleteMovie.emit(this.movieId);
          }, error => {
            this.errMsg.emit('ארעה שגיאה במחיקת הסרט');
          });
  }

}
