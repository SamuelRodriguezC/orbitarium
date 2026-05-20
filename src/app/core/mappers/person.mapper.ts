import { PersonDto } from '../models/person.dto';
import { Person } from '../models/person.model';


// Convierte los datos que vienen de la API (DTO)
// al modelo limpio que usa la aplicación
export function mapPerson(dto: PersonDto): Person {
  return {
    ...dto,
    height: parseNumber(dto.height),
    mass: parseNumber(dto.mass),
    created: new Date(dto.created),
    edited: new Date(dto.edited),
  };
}

function parseNumber(value: string): number | null {
  const parsed = Number(value);
  return isNaN(parsed) ? null : parsed;
}


// Extrae el ID del personaje desde la URL de SWAPI
export function extractPersonId(url: string): number {
  const match = url.match(/\/people\/(\d+)\//);
  return match ? Number(match[1]) : 0;
}