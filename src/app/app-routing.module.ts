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

// Rutas
const appRoutes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: HomeComponent },
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
