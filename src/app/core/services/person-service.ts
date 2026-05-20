import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

import { PersonDto } from '../models/person.dto';
import { Person } from '../models/person.model';
import { PaginatedResponse } from '../models/paginated-response.model';
import { mapPerson } from '../mappers/person.mapper';

@Injectable({
  providedIn: 'root',
})
export class PersonService {

  // HttpClient moderno con inject()
  private readonly http = inject(HttpClient);

  // Base API de SWAPI (centralizada en el service)
  private readonly baseUrl = 'https://swapi.py4e.com/api/people';

   /**
   * Obtiene personas paginadas desde la API
   * y transforma DTO → modelo de dominio
   */
  getPeople(page: number): Observable<PaginatedResponse<Person>> {
    const url = `${this.baseUrl}?page=${page}`;

    return this.http.get<PaginatedResponse<PersonDto>>(url).pipe(
      map(response => ({
        ...response,
        // normaliza datos hacia el modelo interno de la app
        results: response.results.map(mapPerson),
      }))
    );
  }
}