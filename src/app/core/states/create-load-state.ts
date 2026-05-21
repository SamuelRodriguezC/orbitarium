import { signal, computed, WritableSignal } from '@angular/core';
import { LoadState } from './load-state.model';

export function createLoadState<T>() {
  const state: WritableSignal<LoadState<T>> = signal({
    data: null,
    loading: false,
    error: null,
  });

  return {
    state,

    data: computed(() => state().data),
    loading: computed(() => state().loading),
    error: computed(() => state().error),

    setLoading() {
      state.update(s => ({ ...s, loading: true, error: null }));
    },

    setData(data: T) {
      state.set({ data, loading: false, error: null });
    },

    setError(message: string) {
      state.set({ data: null, loading: false, error: message });
    },
  };
}