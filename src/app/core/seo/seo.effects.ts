import { Injectable, inject } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { filter, map, mergeMap } from 'rxjs';
import { SeoService } from './seo.service';

@Injectable({ providedIn: 'root' })
export class SeoEffects {
  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly seo = inject(SeoService);

  init() {
    this.router.events
      .pipe(
        filter((e): e is NavigationEnd => e instanceof NavigationEnd),
        map(() => this.activatedRoute),
        map(route => {
          while (route.firstChild) route = route.firstChild;
          return route;
        }),
        mergeMap(route => route.data)
      )
      .subscribe(data => {
        if (data?.['seo']) {
          this.seo.setSeo(data['seo']);
        }
      });
  }
}