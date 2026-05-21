import { inject, Injectable, signal } from '@angular/core';
import { SwapiService } from './swapi.service';
import { Planet } from '../models/planet.model';
import { Person } from '../models/person.model';
import { PlanetMapper } from '../mappers/planet.mapper';
import { computed } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class PlanetService {

  private swapi = inject(SwapiService);

  private planets = signal<Planet[]>([]);
  private people = signal<Person[]>([]);
  private loading = signal(false);

    readonly planetsGrouped = computed(() => {
    const people = this.people();

    const byPlanet = new Map<string, string[]>();

    for (const p of people) {
        const key = p.homeworld;
        byPlanet.set(key, [...(byPlanet.get(key) ?? []), p.name]);
    }

    return this.planets().map(planet => ({
        ...planet,
        residents: byPlanet.get(planet.url) ?? []
    }));
    });

  load() {
    this.loading.set(true);

    this.swapi.getAll<any>('planets').subscribe(planets => {
      this.planets.set(planets.map(PlanetMapper.toModel));
      this.loading.set(false);
    });

    this.swapi.getAll<Person>('people').subscribe(people => {
      this.people.set(people);
    });
  }

  state = {
    planets: this.planets,
    grouped: this.planetsGrouped,
    loading: this.loading
  };
}