import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/home/home').then(m => m.Home),
  },
   {
    path: 'personajes',
    loadComponent: () =>
      import('./features/people/people-component').then(m => m.PeopleComponent),
    data: {
      seo: {
        title: 'Personajes de Star Wars',
        description: 'Explora todos los personajes del universo Star Wars',
      },
    },
  },
];