import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Params } from '@angular/router';
import { MovieDbService } from '../movie-db.service';

@Component({
  selector: 'app-movie-info',
  templateUrl: './movie-info.component.html',
  styleUrls: ['./movie-info.component.scss']
})
export class MovieInfoComponent implements OnInit {
  id;
  movie;
  hasNYTLink: boolean;

  constructor(private activatedRoute: ActivatedRoute, private ms: MovieDbService) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.ms.getMovie(this.id).subscribe((res) => {
        this.movie = res;
        this.ms.getNYTimesReview(this.movie.original_title).subscribe((res) => {
          const nytMovie = res.results.filter((e) => {
            return e.display_title == this.movie.original_title;
          });
          if (nytMovie[0]) {
            this.hasNYTLink = true;
            this.ms.scrappingNYTimes(nytMovie[0].link.url).subscribe(res => {
              this.movie.emotions = res;
              res.map((e, i) => {
                res[i].score *= 100;
                switch (e.tone_name) {
                  case 'Anger':
                    res[i].tone_name = 'Raiva';
                    res[i].color = '#ff1f1f';
                    break;
                  case 'Fear':
                    res[i].tone_name = 'Medo';
                    res[i].color = '#eeff3b';
                    break;
                  case 'Joy':
                    res[i].tone_name = 'Alegria';
                    res[i].color = '#fe81cf';
                    break;
                  case 'Sadness':
                    res[i].tone_name = 'Tristeza';
                    res[i].color = '#362828';
                    break;
                  case 'Analytical':
                    res[i].tone_name = 'Analitico';
                    res[i].color = '#78C000';
                    break;
                  case 'Confident':
                    res[i].tone_name = 'Confiante';
                    res[i].color = '#416fff';
                    break;
                  case 'Tentative':
                    res[i].tone_name = 'Persistente';
                    res[i].color = '#2d839e';
                    break;
                }
              });
            });
          } else {
            this.hasNYTLink = false;
          }
        });
      });
    });
  }

}
