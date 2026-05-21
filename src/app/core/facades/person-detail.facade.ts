import { Injectable, inject } from '@angular/core';
import { PersonService } from '../services/person-service';
import { PersonDetailState } from '../states/person-detail.state';

@Injectable({ providedIn: 'root' })
export class PersonDetailFacade {

  private service = inject(PersonService);
  private state = new PersonDetailState();

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
        this.state.loading.set(false);
        this.state.person.set(null);
      }
    });
  }
}