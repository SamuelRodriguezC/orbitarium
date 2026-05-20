export interface Person {
  name: string;
  height: number | null;
  mass: number | null;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  homeworld: string;
  films: string[];
  species: string[];
  vehicles: string[];
  starships: string[];
  created: Date;
  edited: Date;
  url: string;
}