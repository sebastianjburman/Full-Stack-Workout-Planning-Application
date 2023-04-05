import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginpageComponent } from './pages/loginpage/loginpage.component';
import { SignuppageComponent } from './pages/signuppage/signuppage.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { AuthGuard } from './guards/auth.guard';
import { LoginSignupRedirectGuard } from './guards/login-signup-redirect.guard';
import { WorkoutsPageComponent } from './pages/workouts-page/workouts-page.component';
import { PeoplePageComponent } from './pages/people-page/people-page.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { ExercisesPageComponent } from './pages/exercises-page/exercises-page.component';
import { ExerciseViewPageComponent } from './pages/exercise-view-page/exercise-view-page.component';
import { WorkoutViewPageComponent } from './pages/workout-view-page/workout-view-page.component';
const routes: Routes = [
  {
    path: 'login',
    component: LoginpageComponent,
    canActivate: [LoginSignupRedirectGuard],
  },
  {
    path: 'signup',
    component: SignuppageComponent,
    canActivate: [LoginSignupRedirectGuard],
  },
  { path: 'home', component: HomePageComponent, canActivate: [AuthGuard] },
  {
    path: 'workouts',
    component: WorkoutsPageComponent,
    canActivate: [AuthGuard],
  },
  { path: 'people', component: PeoplePageComponent, canActivate: [AuthGuard] },
  {
    path: 'exercises',
    component: ExercisesPageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'profile/:username',
    component: ProfilePageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'exercise/:id',
    component: ExerciseViewPageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'workout/:id',
    component: WorkoutViewPageComponent,
    canActivate: [AuthGuard],
  },

  { path: '', redirectTo: '/login', pathMatch: 'full' },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
