import { HomePageComponent } from './home-page/home-page.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HowWorksComponent } from './how-works/how-works.component';
import { MovieInfoComponent } from './movie-info/movie-info.component';

const ROUTES: Routes = [
    { path: '', component: HomePageComponent},
    { path: 'how-works', component: HowWorksComponent},
    { path: 'movie/:id', component: MovieInfoComponent}
];

@NgModule({
    imports: [
        RouterModule.forRoot(ROUTES)
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {}
