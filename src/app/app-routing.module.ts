// importar modulos del router de angular
import { NgModule, ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// importar componentes
import { HomeComponent } from './modules/notLogged/home/home.component';
import { NotFoundComponent } from './shared/not-found/not-found.component';
import { SearchResultsComponent } from './modules/notLogged/search-results/search-results.component';
import { LoginComponent } from './modules/notLogged/login/login.component';
import { RegisterComponent } from './modules/notLogged/register/register.component';
import { MoreInfoComponent } from './modules/notLogged/more-info/more-info.component';
import { MoviesComponent } from './modules/notLogged/movies/movies.component';
import { WebMapComponent } from './modules/web-map/web-map.component';
import { UserPremiumComponent } from '@modules/premium/user-premium/user-premium.component';
import { VideogamesPremiumComponent } from '@modules/premium/videogames-premium/videogames-premium.component';
import { MoviesPremiumComponent } from '@modules/premium/movies-premium/movies-premium.component';
import { AddGameComponent } from '@modules/admin/add-game/add-game.component';
import { AddMovieComponent } from '@modules/admin/add-movie/add-movie.component';
import { AddCategoryComponent } from '@modules/admin/add-category/add-category.component';
import { AddDirectorComponent } from '@modules/admin/add-director/add-director.component';
import { AddActorComponent } from '@modules/admin/add-actor/add-actor.component';
import { ShowAllComponent } from '@modules/admin/show-all/show-all.component';
import { HomePremiumComponent } from './modules/premium/home-premium/home-premium.component';
import { SearchPremiumComponent } from '@modules/premium/search-premium/search-premium.component';

import { GuardGuard } from '@core/guards/guard.guard';

// Rutas
const appRoutes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'adminAddGame', component: AddGameComponent, canActivate: [GuardGuard] },
  { path: 'adminAddGame/:id', component: AddGameComponent, canActivate: [GuardGuard] },
  { path: 'adminAddMovie', component: AddMovieComponent, canActivate: [GuardGuard] },
  { path: 'adminAddMovie/:id', component: AddMovieComponent, canActivate: [GuardGuard] },
  { path: 'adminAddCategory', component: AddCategoryComponent, canActivate: [GuardGuard] },
  { path: 'adminAddCategory/:id', component: AddCategoryComponent, canActivate: [GuardGuard] },
  { path: 'adminAddDirector', component: AddDirectorComponent, canActivate: [GuardGuard] },
  { path: 'adminAddDirector/:id', component: AddDirectorComponent, canActivate: [GuardGuard] },
  { path: 'adminAddActor', component: AddActorComponent, canActivate: [GuardGuard] },
  { path: 'adminAddActor/:id', component: AddActorComponent, canActivate: [GuardGuard] },
  { path: 'adminShow/:type', component: ShowAllComponent, canActivate: [GuardGuard] },
  { path: 'home', component: HomeComponent },
  { path: 'homePremium', component: HomePremiumComponent },
  { path: 'homePremium/:type', component: HomePremiumComponent },
  { path: 'userData', component:UserPremiumComponent },
  { path: 'gamesPremium', component: VideogamesPremiumComponent },
  { path: 'gamesPremium/:type', component: VideogamesPremiumComponent },
  { path: 'searchPremium/:name', component: SearchPremiumComponent },
  { path: 'moviesPremium', component: MoviesPremiumComponent },
  { path: 'moviesPremium/:type', component: MoviesPremiumComponent },
  { path: 'searchResults/:title', component: SearchResultsComponent },
  { path: 'more-info/:title', component: MoreInfoComponent },
  { path: 'movies', component: MoviesComponent },
  { path: 'web-map', component: WebMapComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '**', component: NotFoundComponent },
];
export const AppRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
