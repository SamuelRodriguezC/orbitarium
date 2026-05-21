import { Component, inject, effect } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';

import { PersonFacade } from '../../core/facades/person.facade';
import { extractPersonId } from '../../core/mappers/person.mapper';

@Component({
  selector: 'app-people-component',
  standalone: true,
  templateUrl: './people-component.html',
})
export class PeopleComponent {

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private facade = inject(PersonFacade);

  // URL = source of truth
  readonly page = toSignal(
    this.route.queryParamMap.pipe(
      map(params => Number(params.get('page') ?? 1))
    ),
    { initialValue: 1 }
  );

  // expose state
  readonly people = this.facade.people;
  readonly loading = this.facade.loading;
  readonly pagination = this.facade.pagination;

  constructor() {
    effect(() => {
      this.facade.loadPage(this.page());
    });
  }

  goToPage(page: number) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { page },
      queryParamsHandling: 'merge',
    });
  }

  nextPage() {
    this.facade.nextPage();
  }

  prevPage() {
    this.facade.prevPage();
  }

  goToPerson(person: any) {
    const id = extractPersonId(person.url);
    this.router.navigate(['/personajes', id]);
  }
}