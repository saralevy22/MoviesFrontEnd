export class Movie {
   movieId: string;
   movieName: string;
   category: string;
   imdbLink: string;
   imdbPosterLink: string;
   createDate: any;

   constructor(_movieId: string,_movieName: string, _category: string, _imdbLink: string, _imdbPosterLink: string, _createDate: any){
    this.movieId = _movieId;
    this.movieName = _movieName;
    this.category = _category;
    this.imdbLink = _imdbLink;
    this.imdbPosterLink = _imdbPosterLink;
    this.createDate = _createDate;
  }
}
