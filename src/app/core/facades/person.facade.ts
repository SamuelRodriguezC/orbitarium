import { Injectable, inject } from '@angular/core';
import { PersonService } from '../services/person-service';
import { PersonState } from '../states/person.state';

@Injectable({ providedIn: 'root' })
export class PersonFacade {

  private readonly service = inject(PersonService);
  private readonly state = new PersonState();

  // Exposición directa del estado (single source of truth)
  readonly people = this.state.people;
  readonly loading = this.state.loading;
  readonly pagination = this.state.pagination;

  loadPage(page: number) {
    this.state.loading.set(true);

    this.service.getPage(page).subscribe({
      next: (res) => {
        this.state.people.set(res.results);

        this.state.pagination.set({
          next: res.next,
          previous: res.previous,
          page
        });

        this.state.loading.set(false);
      },
      error: () => {
        this.state.loading.set(false);
      }
    });
  }

  nextPage() {
    const next = this.state.pagination().next;
    if (!next) return;

    const page = this.extractPage(next);
    if (page) this.loadPage(page);
  }

  prevPage() {
    const prev = this.state.pagination().previous;
    if (!prev) return;

    const page = this.extractPage(prev);
    if (page) this.loadPage(page);
  }

  private extractPage(url: string): number | null {
    const params = new URL(url).searchParams.get('page');
    return params ? Number(params) : null;
  }
}