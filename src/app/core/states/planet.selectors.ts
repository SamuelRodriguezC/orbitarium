import { computed } from '@angular/core';
import { PlanetState } from './planet.state';

export function createPlanetSelectors(state: PlanetState) {

  const planetsGrouped = computed(() => {
    const people = state.people();

    const byPlanet = new Map<string, string[]>();

    for (const p of people) {
      const key = p.homeworld;
      byPlanet.set(key, [...(byPlanet.get(key) ?? []), p.name]);
    }

    return state.planets().map(planet => ({
      ...planet,
      residents: byPlanet.get(planet.url) ?? []
    }));
  });

  return {
    planetsGrouped
  };
}