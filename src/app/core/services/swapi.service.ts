import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, EMPTY, expand, reduce } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SwapiService {
  private http = inject(HttpClient);
  private baseUrl = 'https://swapi.py4e.com/api';

  getAll<T>(endpoint: string): Observable<T[]> {
    return this.http.get<any>(`${this.baseUrl}/${endpoint}`).pipe(
      expand((res) => (res.next ? this.http.get<any>(res.next) : EMPTY)),
      reduce((acc: T[], res: any) => [...acc, ...res.results], []),
    );
  }

  getPage<T>(endpoint: string, page: number) {
    return this.http.get<T>(`${this.baseUrl}/${endpoint}/?page=${page}`);
  }

  getById<T>(endpoint: string, id: number) {
    return this.http.get<T>(`${this.baseUrl}/${endpoint}/${id}`);
  }
}
