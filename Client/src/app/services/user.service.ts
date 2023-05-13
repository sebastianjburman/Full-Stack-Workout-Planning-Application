import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserDTO } from '../models/userDTO';
import { UserLoginDTO } from '../models/userLoginDTO';
import { Observable } from 'rxjs';
import { WeightEntry } from '../models/weightEntry';

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
  public getUserProfileByUserName(token: string, username: string): Observable<any> {
    return this.http.get(`${this.url}/profile`, {
      headers: {
        'Authorization': `Bearer ${token}`
      },
      params: {
        'userName': username
      }
    })
  }
  public getDiscoverProfiles(token: string): Observable<any> {
    return this.http.get(`${this.url}/profiles`, {
      headers: {
        'Authorization': `Bearer ${token}`
      },
    })
  }
  public getUserProfile(token: string): Observable<any> {
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
  public getUserMonthlyWeightEntries(token: string): Observable<any> {
    return this.http.get(`${this.url}/weightentries`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
  }
  public addWeightEntry(token: string, weight: WeightEntry): Observable<any> {
    return this.http.post(`${this.url}/weightentry`, weight, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
  }
  public deleteWeightEntry(token: string, entryId:string): Observable<any> {
    return this.http.delete(`${this.url}/weightentry`, {
      headers: {
        'Authorization': `Bearer ${token}`
      },
      params: {
        "id": entryId
      }
    })
  }
  public uploadProfileImage(token: string, file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append("file", file);
    return this.http.post(`${this.url}/profilephoto`, formData, {
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    });
  }
  public clearProfileImage(token: string): Observable<any> {
    const formData: FormData = new FormData();
    return this.http.post(`${this.url}/profilephoto`, formData, {
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    });
  }
  
}
