import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NgbModule,NgbDropdownModule} from '@ng-bootstrap/ng-bootstrap';
import { LoginpageComponent } from './pages/loginpage/loginpage.component';
import { SignuppageComponent } from './pages/signuppage/signuppage.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { SideNavBarComponent } from './components/side-nav-bar/side-nav-bar.component';
import { BottomNavbarComponent } from './components/bottom-navbar/bottom-navbar.component';
import { WorkoutsPageComponent } from './pages/workouts-page/workouts-page.component';
import { PeoplePageComponent } from './pages/people-page/people-page.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginpageComponent,
    SignuppageComponent,
    HomePageComponent,
    SideNavBarComponent,
    BottomNavbarComponent,
    WorkoutsPageComponent,
    PeoplePageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbDropdownModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
