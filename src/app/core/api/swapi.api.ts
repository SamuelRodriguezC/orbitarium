import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { expand, reduce, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SwapiApi {
  private http = inject(HttpClient);
  private readonly baseUrl = 'https://swapi.py4e.com/api';

  getAllPaginated<T>(endpoint: string): Observable<T[]> {
    return this.http.get<any>(`${this.baseUrl}/${endpoint}`).pipe(
      expand(res => res.next ? this.http.get(res.next) : []),
      reduce((acc: T[], res: any) => [...acc, ...res.results], [])
    );
  }

  getOne<T>(url: string): Observable<T> {
    return this.http.get<T>(url);
  }

  getById<T>(endpoint: string, id: number): Observable<T> {
    return this.http.get<T>(`${this.baseUrl}/${endpoint}/${id}`);
  }
}