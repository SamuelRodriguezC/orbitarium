import { Injectable, inject } from '@angular/core';
import { SwapiService } from './swapi.service';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

import { PersonDto } from '../dto/person.dto';
import { Person } from '../models/person.model';
import { PaginatedResponse } from '../models/paginated-response.model';
import { mapPerson } from '../mappers/person.mapper';

@Injectable({
  providedIn: 'root',
})
export class PersonService {
  private swapi = inject(SwapiService);

  getPage(page: number) {
    return this.swapi.getPage<PaginatedResponse<Person>>('people', page);
  }

  getAll() {
    return this.swapi.getAll<Person>('people');
  }

  getById(id: number) {
  return this.swapi.getById<Person>('people', id);
  }
}