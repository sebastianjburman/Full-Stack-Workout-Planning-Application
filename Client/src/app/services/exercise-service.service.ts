import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Exercise } from '../models/exercise';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ExerciseServiceService {
  constructor(private http: HttpClient) {}
  private url = 'v1/exercise';

  public createExercise(exercise: Exercise, token: string): Observable<any> {
    return this.http.post(this.url, exercise, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  public updateExercise(exercise: Exercise, token: string): Observable<any> {
    return this.http.put(this.url, exercise, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        id: exercise.id,
      },
    });
  }
  public getExercise(id: string, token: string): Observable<any> {
    return this.http.get(this.url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        id: id,
      },
    });
  }
}
