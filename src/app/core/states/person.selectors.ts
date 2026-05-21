import { computed } from '@angular/core';
import { PersonState } from './person.state';

export function createPersonSelectors(state: PersonState) {

  const hasNext = computed(() => !!state.pagination().next);
  const hasPrev = computed(() => !!state.pagination().previous);

  return {
    hasNext,
    hasPrev
  };
}