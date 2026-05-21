import { signal } from '@angular/core';
import { Planet } from '../models/planet.model';
import { Person } from '../models/person.model';

export class PlanetState {
  planets = signal<Planet[]>([]);
  people = signal<Person[]>([]);
  loading = signal(false);
}