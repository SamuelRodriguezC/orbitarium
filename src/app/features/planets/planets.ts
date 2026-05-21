import { Component, inject } from '@angular/core';
import { PlanetFacade } from '../../core/facades/planet.facade';

@Component({
  selector: 'app-planets',
  standalone: true,
  templateUrl: './planets.html',
  styleUrls: ['./planets.css'],
})
export class Planets {

  private facade = inject(PlanetFacade);

  readonly planets = this.facade.grouped;
  readonly loading = this.facade.loading;

  constructor() {
    this.facade.load();
  }
}