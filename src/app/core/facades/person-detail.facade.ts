import { Injectable, inject, effect } from '@angular/core';
import { PersonService } from '../services/person-service';
import { PersonDetailState } from '../states/person-detail.state';
import { SeoService } from '../seo/seo.service';

@Injectable({ providedIn: 'root' })
export class PersonDetailFacade {

  private readonly service = inject(PersonService);
  private readonly seo = inject(SeoService);
  private readonly state = new PersonDetailState();

  // exposed state
  readonly person = this.state.person;
  readonly loading = this.state.loading;

  constructor() {

    // SEO REACTIVO basado en el estado real
    effect(() => {
      const person = this.state.person();

      if (!person) return;

      this.seo.setDynamicSeo(
        person.name,
        `Descubre a ${person.name}, personaje del universo Star Wars.`
      );
    });
  }

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