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
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { WorkoutPreviewComponent } from './components/workout-preview/workout-preview.component';
import { UserViewProfileComponent } from './components/user-view-profile/user-view-profile.component';
import { ExercisesPageComponent } from './pages/exercises-page/exercises-page.component';
import { ExercisePreviewComponent } from './components/exercise-preview/exercise-preview.component';
import { TopCreatorProfileComponent } from './components/top-creator-profile/top-creator-profile.component';
import { ExerciseViewPageComponent } from './pages/exercise-view-page/exercise-view-page.component';
import { ToastComponent } from './components/toast/toast.component';
import { CreateExerciseModalComponent } from './components/create-exercise-modal/create-exercise-modal.component';
import { ExerciseListComponent } from './components/exercise-list/exercise-list.component';
import { WorkoutViewPageComponent } from './pages/workout-view-page/workout-view-page.component';
import { WorkoutCreatePageComponent } from './pages/workout-create-page/workout-create-page.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { NgChartsModule } from 'ng2-charts';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import { TopWorkoutPreviewComponent } from './components/top-workout-preview/top-workout-preview.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { UpdateExerciseModalComponent } from './components/update-exercise-modal/update-exercise-modal.component';
import { WorkoutUpdatePageComponent } from './pages/workout-update-page/workout-update-page.component';

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
    PeoplePageComponent,
    ProfilePageComponent,
    WorkoutPreviewComponent,
    UserViewProfileComponent,
    ExercisesPageComponent,
    ExercisePreviewComponent,
    TopCreatorProfileComponent,
    ExerciseViewPageComponent,
    ToastComponent,
    CreateExerciseModalComponent,
    ExerciseListComponent,
    WorkoutViewPageComponent,
    WorkoutCreatePageComponent,
    TopWorkoutPreviewComponent,
    SettingsComponent,
    UpdateExerciseModalComponent,
    WorkoutUpdatePageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbDropdownModule,
    DragDropModule,
    NgChartsModule,
    NgbAccordionModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
