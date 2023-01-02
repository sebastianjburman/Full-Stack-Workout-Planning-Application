import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginpageComponent } from './pages/loginpage/loginpage.component';
import { SignuppageComponent } from './pages/signuppage/signuppage.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { AuthGuard } from './guards/auth.guard';
const routes: Routes = [
  { path: "login", component: LoginpageComponent },
  { path: "signup", component: SignuppageComponent },
  { path: "", component:HomePageComponent,canActivate: [AuthGuard]},
  { path: '',redirectTo: '/login',pathMatch: 'full'}]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
