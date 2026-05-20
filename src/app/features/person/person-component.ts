import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { toSignal, toObservable } from '@angular/core/rxjs-interop';
import { map, switchMap, shareReplay } from 'rxjs';

import { PersonService } from '../../core/services/person-service';
import { createLoadState } from '../../core/state/create-load-state';
import { PaginatedResponse } from '../../core/models/paginated-response.model';
import { Person } from '../../core/models/person.model';

@Component({
  selector: 'app-person-component',
  standalone: true,
  templateUrl: './person-component.html',
})
export class PersonComponent {

  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly personService = inject(PersonService);

  // Estado centralizado (loading, data, error)
  readonly peopleState = createLoadState<PaginatedResponse<Person>>();

  // Query param reactivo → Signal (source of truth URL)
  readonly page = toSignal(
    this.route.queryParamMap.pipe(
      map(params => Number(params.get('page') ?? 1))
    ),
    { initialValue: 1 }
  );

  /**
   * Flujo reactivo:
   * page (signal) → observable → HTTP request → estado UI
   */
  private readonly people$ = toObservable(this.page).pipe(
    switchMap(page => {
      this.peopleState.setLoading();
      return this.personService.getPeople(page);
    }),
    shareReplay(1)
  );

  constructor() {
    // Suscripción controlada con lifecycle automático (SSR-safe)
    this.people$.subscribe({
      next: data => this.peopleState.setData(data),
      error: () => this.peopleState.setError('Error loading people'),
    });
  }

  /**
   * Cambia página actual modificando la URL
   * (la URL es la única fuente de verdad)
   */
  goToPage(page: number) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { page },
      queryParamsHandling: 'merge',
    });
  }

  
  // Navegación basada en links de la API (next/previous)
  nextPage() {
    const next = this.peopleState.data()?.next;
    if (!next) return;

    const page = new URL(next).searchParams.get('page');
    if (page) this.goToPage(Number(page));
  }

  prevPage() {
    const prev = this.peopleState.data()?.previous;
    if (!prev) return;

    const page = new URL(prev).searchParams.get('page');
    if (page) this.goToPage(Number(page));
  }
}