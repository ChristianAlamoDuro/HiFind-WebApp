// importar modulos del router de angular
import { NgModule, ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// importar componentes
import { HomeComponent } from './components/home/home.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { SearchResultsComponent } from './components/search-results/search-results.component';
const appRoutes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: HomeComponent },
  { path: 'searchResults/:title', component: SearchResultsComponent },
  { path: '**', component: NotFoundComponent }
];
export const AppRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
