import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginpageComponent } from './pages/loginpage/loginpage.component';
import { SignuppageComponent } from './pages/signuppage/signuppage.component';
const routes: Routes = [{path:"login",component:LoginpageComponent},{path:"signup",component:SignuppageComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
