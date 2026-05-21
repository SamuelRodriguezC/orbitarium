import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideAppInitializer, inject  } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withFetch } from '@angular/common/http';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';

import { SeoEffects } from './core/seo/seo.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes), 
    provideHttpClient(withFetch()),
    provideClientHydration(withEventReplay()),
    provideAppInitializer(() => {
      const seo = inject(SeoEffects);
      seo.init(); // subscribe a router events
    }),
  ]
};
