import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

import { PersonDto } from '../models/person.dto';          // Contrato EXACTO que devuelve la API
import { Person } from '../models/person.model';           // Modelo de dominio que usa la app
import { PaginatedResponse } from '../models/paginated-response.model';
import { mapPerson } from '../mappers/person.mapper';      // Función que transforma DTO → Modelo

@Injectable({
  providedIn: 'root',
})
export class PersonService {

  // Inyección moderna sin constructor (Angular actual)
  private readonly http = inject(HttpClient);

  // URL base del endpoint
  private readonly baseUrl = 'https://swapi.py4e.com/api/people';

  /**
   * Obtiene una página de personas desde la API.
   * 
   * Flujo interno:
   * 1. Se hace la petición HTTP tipada como PersonDto (formato crudo del backend).
   * 2. Se transforma cada resultado a Person (modelo interno de la aplicación).
   * 3. Se retorna una estructura ya limpia y lista para usar en la UI.
   *
   * @param page Número de página a consultar (por defecto 1)
   * @returns Observable con datos ya transformados a Person
   */
  getPeople(page = 1) {
    return this.http
      // Se usa person DTO porque es lo que devuelve la API
      .get<PaginatedResponse<PersonDto>>(`${this.baseUrl}?page=${page}`)
      .pipe(
        map(response => ({
          // Conservamos propiedades como count, next y previous
          ...response,

          // Transformamos cada DTO en un modelo de dominio Person
          results: response.results.map(mapPerson),
        }))
      );
  }
}