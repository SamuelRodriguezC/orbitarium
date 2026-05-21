import { inject, Injectable, signal } from '@angular/core';
import { SwapiService } from './swapi.service';
import { Planet } from '../models/planet.model';
import { Person } from '../models/person.model';
import { PlanetMapper } from '../mappers/planet.mapper';
import { computed } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class PlanetService {
  private swapi = inject(SwapiService);

  getAll() {
    return this.swapi.getAll<any>('planets');
  }
}