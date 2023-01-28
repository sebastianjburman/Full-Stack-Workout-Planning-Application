import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserDTO } from '../models/userDTO';
import { UserLoginDTO } from '../models/userLoginDTO';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {
  }
  private url = 'v1/user';

  public createUser(user: UserDTO): Observable<any> {
    return this.http.post(this.url, user);
  }
  public authenticate(userLogin: UserLoginDTO): Observable<any> {
    return this.http.post(`${this.url}/authenticate`, userLogin)
  }
  public getUser(token: string): Observable<any> {
    return this.http.get(this.url, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
  }
  public getUserProfileByUserName(token:string, username:string): Observable<any>{
    return this.http.get(`${this.url}/profile`, {
      headers: {
        'Authorization': `Bearer ${token}`
      },
      params:{
        'userName': username
      }
    })
  }
  public getUserProfile(token:string): Observable<any>{
    return this.http.get(`${this.url}/myprofile`, {
      headers: {
        'Authorization': `Bearer ${token}`
      },
    })
  }
  public checkAuth(token: string): Observable<any> {
    return this.http.get(`${this.url}/checkauth`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
  }
}
