import { Component, inject, effect } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';

import { PersonDetailFacade } from '../../../../core/facades/person-detail.facade';

@Component({
  selector: 'app-person-detail',
  standalone: true,
  templateUrl: './person-detail.html',
})
export class PersonDetail {

  private route = inject(ActivatedRoute);
  private facade = inject(PersonDetailFacade);

  // URL = source of truth
  readonly id = toSignal(
    this.route.paramMap.pipe(
      map(params => Number(params.get('id')))
    ),
    { initialValue: 0 }
  );

  // exposed state
  readonly person = this.facade.person;
  readonly loading = this.facade.loading;

  constructor() {
    effect(() => {
      const id = this.id();
      if (id) this.facade.load(id);
    });
  }
}