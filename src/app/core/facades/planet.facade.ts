import { Injectable, computed, inject, signal } from '@angular/core';
import { PlanetService} from '../services/planet-service';
import { PersonService } from '../services/person-service';
import { PlanetState } from '../states/planet.state';
import { PlanetMapper } from '../mappers/planet.mapper';
import { Planet } from '../models/planet.model';
import { Person } from '../models/person.model';
import { forkJoin } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PlanetFacade {

  private readonly planetService = inject(PlanetService);
  private readonly peopleService = inject(PersonService);

  private readonly state = new PlanetState();

  // exposición de estado
  readonly planets = this.state.planets;
  readonly people = this.state.people;
  readonly loading = this.state.loading;

  // derivado puro (SIN signals duplicados en facade)
  readonly grouped = computed(() => {
    const planets = this.state.planets();
    const people = this.state.people();

    const map = new Map<string, string[]>();

    for (const p of people) {
      map.set(p.homeworld, [
        ...(map.get(p.homeworld) ?? []),
        p.name
      ]);
    }

    return planets.map(planet => ({
      ...planet,
      residents: map.get(planet.url) ?? []
    }));
  });

  load() {
    this.state.loading.set(true);

    forkJoin({
      planets: this.planetService.getAll(),
      people: this.peopleService.getAll()
    }).subscribe({
      next: ({ planets, people }) => {
        this.state.planets.set(planets.map(PlanetMapper.toModel));
        this.state.people.set(people);
        this.state.loading.set(false);
      },
      error: () => {
        this.state.loading.set(false);
      }
    });
  }

  clear() {
    this.state.planets.set([]);
    this.state.people.set([]);
    this.state.loading.set(false);
  }
}