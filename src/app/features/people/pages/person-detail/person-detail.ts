import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { switchMap, map } from 'rxjs';

import { PersonService } from '../../../../core/services/person-service';
import { extractPersonId } from '../../../../core/mappers/person.mapper';


@Component({
  selector: 'app-person-detail',
  imports: [],
  templateUrl: './person-detail.html',
})
export class PersonDetail {
  private readonly route = inject(ActivatedRoute);
  private readonly service = inject(PersonService);

  // Signal reactivo basado en URL param
  readonly person = toSignal(
    this.route.paramMap.pipe(
      // Obtiene el id desde la URL
      map(params => Number(params.get('id'))),

      // Llama a la API cada vez que cambia el id
      switchMap(id => this.service.getPerson(id))
    )
  );
}
