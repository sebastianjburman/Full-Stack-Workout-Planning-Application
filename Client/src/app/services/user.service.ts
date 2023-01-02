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
    return this.http.post(`${this.url}/authenticate`,userLogin)
  }
}
