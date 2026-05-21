import { signal } from '@angular/core';
import { Person } from '../models/person.model';

export class PersonDetailState {
  person = signal<Person | null>(null);
  loading = signal(false);
}