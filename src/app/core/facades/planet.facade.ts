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

  private planetServ = inject(PlanetService);
  private peopleServ = inject(PersonService);
  private state = new PlanetState();

  planets = signal<Planet[]>([]);
  people = signal<Person[]>([]);
  loading = signal(false);


  readonly grouped = this.createGrouped();

  load() {
    this.state.loading.set(true);

    forkJoin({
      planets: this.planetServ.getAll(),
      people: this.peopleServ.getAll()
    }).subscribe(({ planets, people }) => {

      this.state.planets.set(planets.map(PlanetMapper.toModel));
      this.state.people.set(people);

      this.state.loading.set(false);
    });
  }

  private createGrouped() {
    return computed(() => {
      const people = this.state.people();

      const map = new Map<string, string[]>();

      for (const p of people) {
        const key = p.homeworld;
        map.set(key, [...(map.get(key) ?? []), p.name]);
      }

      return this.state.planets().map(planet => ({
        ...planet,
        residents: map.get(planet.url) ?? []
      }));
    });
  }
}