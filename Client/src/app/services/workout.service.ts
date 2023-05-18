import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Workout } from '../models/workout';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WorkoutService {
  constructor(private http: HttpClient) {}
  private url = 'https://workoutplanningapplicationbackend.azurewebsites.net/v1/workout';

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
  public deleteWorkout(id: string, token: string): Observable<any> {
    return this.http.delete(this.url, {
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
  public getRecentlyCreatedWorkouts(token: string): Observable<any> {
    return this.http.get(`${this.url}/recent`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  public likeWorkout(token: string, workoutId: string): Observable<any> {
    return this.http.post(`${this.url}/like`, '', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        workoutId: workoutId,
      },
    });
  }
  public unlikeWorkout(token: string, workoutId: string): Observable<any> {
    return this.http.delete(`${this.url}/unlike`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        workoutId: workoutId,
      },
    });
  }
  public getWorkoutExercises(
    token: string,
    workoutId: string
  ): Observable<any> {
    return this.http.get(`${this.url}/workoutexercises`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        workoutId: workoutId,
      },
    });
  }
  public getWorkoutsCreatedByUsername(
    token: string,
    username: string
  ): Observable<any> {
    return this.http.get(`${this.url}/createdusername`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        username: username,
      },
    });
  }
  public getWorkoutsLikedByUser(token: string): Observable<any> {
    return this.http.get(`${this.url}/liked`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  public getTopLikedWorkouts(token: string): Observable<any> {
    return this.http.get(`${this.url}/topliked`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  public searchWorkout(token: string, search: string): Observable<any> {
    if (search === '') {
      return of([]);
    }
    return this.http
      .get<Workout[]>(`${this.url}/search`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: { search: search }
      })
  }
}
