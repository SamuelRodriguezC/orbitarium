import { Component, inject } from '@angular/core';
import { PersonService } from '../../core/services/person-service';
import { createLoadState } from '../../core/states/create-load-state';
import { PaginatedResponse } from '../../core/models/paginated-response.model';
import { Person } from '../../core/models/person.model';

@Component({
  selector: 'app-person-component',
  standalone: true,
  templateUrl: './person-component.html',
})
export class PersonComponent {

  private readonly personService = inject(PersonService);

  readonly peopleState = createLoadState<PaginatedResponse<Person>>();

  constructor() {
    this.loadPeople();
  }

  private loadPeople() {
    this.peopleState.setLoading();

    this.personService.getPeople().subscribe({
      next: response => this.peopleState.setData(response),
      error: () => this.peopleState.setError('Error loading people'),
    });
  }
}