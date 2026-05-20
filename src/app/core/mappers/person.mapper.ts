import { PersonDto } from '../models/person.dto';
import { Person } from '../models/person.model';

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