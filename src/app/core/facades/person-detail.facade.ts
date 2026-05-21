import { Injectable, inject } from '@angular/core';
import { PersonService } from '../services/person-service';
import { PersonDetailState } from '../states/person-detail.state';

@Injectable({ providedIn: 'root' })
export class PersonDetailFacade {

  private readonly service = inject(PersonService);
  private readonly state = new PersonDetailState();

  readonly person = this.state.person;
  readonly loading = this.state.loading;

  load(id: number) {
    this.state.loading.set(true);

    this.service.getById(id).subscribe({
      next: (data) => {
        this.state.person.set(data);
        this.state.loading.set(false);
      },
      error: () => {
        this.state.person.set(null);
        this.state.loading.set(false);
      }
    });
  }

  clear() {
    this.state.person.set(null);
    this.state.loading.set(false);
  }
}