import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule} from '@angular/forms';

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
    MoviesPremiumComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    routing,
    StoreModule.forRoot({state: reducer})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
