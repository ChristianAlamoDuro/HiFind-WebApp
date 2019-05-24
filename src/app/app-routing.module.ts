// importar modulos del router de angular
import { NgModule, ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// importar componentes
import { HomeComponent } from './modules/home/home.component';
import { NotFoundComponent } from './shared/not-found/not-found.component';
import { SearchResultsComponent } from './modules/search-results/search-results.component';
import { LoginComponent } from './modules/login/login.component';
import { RegisterComponent } from './modules/register/register.component';
import { MoreInfoComponent } from './modules/more-info/more-info.component';
import { MoviesComponent } from './modules/movies/movies.component';
import { WebMapComponent } from './modules/web-map/web-map.component';
import { UserPremiumComponent } from '@modules/premium/user-premium/user-premium.component';
import { VideogamesPremiumComponent } from '@modules/premium/videogames-premium/videogames-premium.component';
import { MoviesPremiumComponent } from '@modules/premium/movies-premium/movies-premium.component';

// Rutas
const appRoutes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: HomeComponent },
  { path: 'homePremium', component: UserPremiumComponent },
  { path: 'gamesPremium', component: VideogamesPremiumComponent },
  { path: 'moviesPremium', component: MoviesPremiumComponent },
  { path: 'searchResults/:title', component: SearchResultsComponent },
  { path: 'more-info/:title', component: MoreInfoComponent },
  { path: 'movies', component: MoviesComponent },
  { path: 'web-map', component: WebMapComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '**', component: NotFoundComponent }
];
export const AppRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
