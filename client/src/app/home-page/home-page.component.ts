import { MovieDbService } from './../movie-db.service';
import { Component, OnInit } from '@angular/core';

import 'rxjs/add/operator/map';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  movies;
  inputMovie;
  constructor(private ms: MovieDbService, private router: Router) { }

  ngOnInit() {
    this.inputMovie = 'Coloque o nome do Filme aqui...';
  }

  queryMovie(inputMovie) {
    this.ms.query(inputMovie).subscribe((res) => {
      this.movies = res.results;
    });
  }

  navToAnalize(index) {
    this.router.navigate(['movie', this.movies[index].id]);
  }

}
