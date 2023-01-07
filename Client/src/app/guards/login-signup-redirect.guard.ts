import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Route, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenManagement } from '../helpers/tokenManagement';

@Injectable({
  providedIn: 'root'
})
export class LoginSignupRedirectGuard implements CanActivate {
  constructor(private router: Router) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const { routeConfig } = route;
    const { path } = routeConfig as Route;
    const token = TokenManagement.getTokenFromLocalStorage();
    /*If token exist in local storage redirect to home route to check if valid.
      This token is removed if inital auth fails for any authguard routes.
    */
    if ((path?.includes('login') || path?.includes('signup')) && token) {
      this.router.navigate(['/home'])
      return true;
    }
    else{
      return true;
    }
  }
  
}
