import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import cheerio from 'cheerio';

@Injectable()
export class MovieDbService {
  baseUrl = 'https://api.themoviedb.org/3/';
  apiKey = '?api_key=ea5e3f4ddfe0b55b57b9033e6ecf87b0';
  language = '&language=pt-BR';

  constructor(private http: Http) { }

  query(text: string) {
    const uriText = text.split(' ').join('+');
    const url = `${this.baseUrl}search/movie${this.apiKey}&query=${uriText}`;
    return this.http.get(url).map((res) => {
      return res.json();
    });
  }

  /*cinemaMovies(startDate: string, finalDate: string) {
    const url = `${this.baseUrl}discover/movie?primary_release_date.gte=${}&primary_release_date.lte=2014-10-22${this.apiKey}`;
  }*/

  getMovie(id: number) {
    const url = `${this.baseUrl}movie/${id}${this.apiKey}${this.language}`;
    return this.http.get(url).map((res) => {
      return res.json();
    });
  }

  getReviews(id: number) {
    const url = `${this.baseUrl}movie/${id}/reviews${this.apiKey}${this.language}`;
    return this.http.get(url).map((res) => {
      return res.json();
    });
  }

  getNYTimesReview(title: string) {
    const uriText = title.split(' ').join('+');
    // tslint:disable-next-line:max-line-length
    const url = `https://developer.nytimes.com/proxy/https/api.nytimes.com/svc/movies/v2/reviews/search.json?api-key=b098e9cc7cd14820bbeac644c6b2bb66&query=${uriText}`;
    return this.http.get(url).map((res) => {
      return res.json();
    });
  }

  scrappingNYTimes(urlNYT: string) {
    return this.http.post('/api/getWatsonData', {url: urlNYT}).map((res) => {
      return res.json();
    });
  }
}
