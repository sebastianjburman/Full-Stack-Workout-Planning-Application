import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Workout } from '../models/workout';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WorkoutService {
  constructor(private http: HttpClient) { }
  private url = 'v1/workout';

  public createWorkout(workout: Workout, token: string): Observable<any> {
    return this.http.post(this.url, workout, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  public updateWorkout(workout: Workout, token: string): Observable<any> {
    return this.http.put(this.url, workout, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        id: workout.id,
      },
    });
  }
  public getWorkout(id: string, token: string): Observable<any> {
    return this.http.get(this.url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        id: id,
      },
    });
  }
  public getWorkoutsCreated(token: string): Observable<any> {
    return this.http.get(`${this.url}/created`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}
