import { Component, inject } from '@angular/core';
import { PlanetService } from '../../core/services/planet-service';

@Component({
  selector: 'app-planets',
  standalone: true,
  templateUrl: './planets.html',
  styleUrls: ['./planets.css'],
})
export class Planets {

  private service = inject(PlanetService);

  planets = this.service.state.grouped;
  loading = this.service.state.loading;

  constructor() {
    this.service.load();
  }
}