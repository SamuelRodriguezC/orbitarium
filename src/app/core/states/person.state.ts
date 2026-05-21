import { signal } from '@angular/core';
import { Person } from '../models/person.model';
import { PaginatedResponse } from '../models/paginated-response.model';

export class PersonState {

  people = signal<Person[]>([]);

  loading = signal(false);

  pagination = signal<{
    next: string | null;
    previous: string | null;
    page: number;
  }>({
    next: null,
    previous: null,
    page: 1
  });
}