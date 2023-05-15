import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Exercise } from '../models/exercise';
import {Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ExerciseService {
  constructor(private http: HttpClient) { }
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

  public deleteExercise(id: string, token: string): Observable<any> {
    return this.http.delete(this.url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        id: id,
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
  public getExercisesCreated(token: string): Observable<any> {
    return this.http.get(`${this.url}/created`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  public getExercisesCreatedSearch(token: string, search: string): Observable<any> {
    if (search === '') {
      return of([]);
    }
    return this.http
      .get<Exercise[]>(`${this.url}/createdsearch`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: { search: search }
      })
  }
  public getRecentExercises(token: string): Observable<any> {
    return this.http.get(`${this.url}/recent`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  public getTopExerciseCreators(token: string): Observable<any> {
    return this.http.get(`${this.url}/topExerciseCreators`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  public searchExercises(token: string, search: string): Observable<any> {
    if (search === '') {
      return of([]);
    }
    return this.http
      .get<Exercise[]>(`${this.url}/search`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: { search: search }
      })
  }
}
