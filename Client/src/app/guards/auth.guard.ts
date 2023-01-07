import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Route, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';
import { TokenManagement } from '../helpers/tokenManagement';
import { UserDTO } from '../models/userDTO';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const token = TokenManagement.getTokenToLocalStorage();
    const validUser = this.userService.checkAuth(token).subscribe({
      next: (res) => {
        console.log(res)
        return true;
      },
      error: (error) => {
        TokenManagement.removeTokenFromLocalStorage();
        this.router.navigateByUrl('/login');
        return false;
      }
    }
    );
    if(validUser){
      return true;
    }
    return false;
  }
}
