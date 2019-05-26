import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// RXJS
import { reducer } from '@core/reducers/reducer';
import { StoreModule } from '@ngrx/store';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './modules/home/home.component';
import { SideNavBarComponent } from './modules/side-navbar/side-navbar.component';
import { BannerComponent } from './shared/banner/banner.component';
import { FooterComponent } from './shared/footer/footer.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { NotFoundComponent } from './shared/not-found/not-found.component';
import { HttpClientModule } from '@angular/common/http';
import { routing, AppRoutingProviders } from './app-routing.module';
import { SearchResultsComponent } from './modules/search-results/search-results.component';
import { LoginComponent } from './modules/login/login.component';
import { RegisterComponent } from './modules/register/register.component';
import { MoreInfoComponent } from './modules/more-info/more-info.component';
import { MoviesComponent } from './modules/movies/movies.component';
import { WebMapComponent } from './modules/web-map/web-map.component';
import { UserPremiumComponent } from './modules/premium/user-premium/user-premium.component';
import { VideogamesPremiumComponent } from './modules/premium/videogames-premium/videogames-premium.component';
import { MoviesPremiumComponent } from './modules/premium/movies-premium/movies-premium.component';
import { AddCategoryComponent } from './modules/admin/add-category/add-category.component';
import { MenuAdminComponent } from './modules/admin/menu-admin/menu-admin.component';
import { AddGameComponent } from './modules/admin/add-game/add-game.component';
import { AddMovieComponent } from './modules/admin/add-movie/add-movie.component';
import { AddDirectorComponent } from './modules/admin/add-director/add-director.component';
import { AddActorComponent } from './modules/admin/add-actor/add-actor.component';
import { ShowAllComponent } from './modules/admin/show-all/show-all.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SideNavBarComponent,
    BannerComponent,
    FooterComponent,
    NavbarComponent,
    NotFoundComponent,
    SearchResultsComponent,
    LoginComponent,
    RegisterComponent,
    MoreInfoComponent,
    MoviesComponent,
    WebMapComponent,
    UserPremiumComponent,
    VideogamesPremiumComponent,
    MoviesPremiumComponent,
    AddCategoryComponent,
    MenuAdminComponent,
    AddGameComponent,
    AddMovieComponent,
    AddDirectorComponent,
    AddActorComponent,
    ShowAllComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    routing,
    StoreModule.forRoot({state: reducer})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
