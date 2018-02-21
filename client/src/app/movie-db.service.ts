import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

import config from '../../../config.json';

@Injectable()
export class MovieDbService {
  baseUrl = 'https://api.themoviedb.org/3/';
  apiKey = `?api_key=${config.tmdbKey}`;
  language = '&language=pt-BR';
  nytKey = config.nytKey;

  constructor(private http: Http) { }

  query(text: string) {
    const uriText = text.split(' ').join('+');
    const url = `${this.baseUrl}search/movie${this.apiKey}&query=${uriText}`;
    return this.http.get(url).map((res) => {
      return res.json();
    });
  }

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
    const url = `https://developer.nytimes.com/proxy/https/api.nytimes.com/svc/movies/v2/reviews/search.json?api-key=${this.nytKey}&query=${uriText}`;
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
