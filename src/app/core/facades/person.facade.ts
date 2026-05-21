import { Injectable, inject } from '@angular/core';
import { PersonService } from '../services/person-service';
import { PersonState } from '../states/person.state';

@Injectable({ providedIn: 'root' })
export class PersonFacade {

  private service = inject(PersonService);
  private state = new PersonState();

  // exposed state
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

    const page = new URL(next).searchParams.get('page');
    if (page) this.loadPage(Number(page));
  }

  prevPage() {
    const prev = this.state.pagination().previous;
    if (!prev) return;

    const page = new URL(prev).searchParams.get('page');
    if (page) this.loadPage(Number(page));
  }
}