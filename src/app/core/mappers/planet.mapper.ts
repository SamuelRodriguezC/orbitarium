import { Planet } from '../models/planet.model';
import { PlanetDto } from '../dto/planet.dto';

export class PlanetMapper {
  static toModel(dto: PlanetDto): Planet {
    return {
      id: dto.url.split('/').filter(Boolean).pop() ?? '',
      name: dto.name,
      url: dto.url,
      climate: dto.climate,
      terrain: dto.terrain,
      population: dto.population,
      residentsCount: dto.residents?.length ?? 0,
      residents: []
    };
  }
}