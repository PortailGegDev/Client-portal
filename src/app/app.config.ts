import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
// import {fr} from "primelocale/fr.json";

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimationsAsync(),
    providePrimeNG({
      // translation:fr,
      theme: {
        preset: Aura,
      },
    }),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    //utiliser pour resoudre le pb de perte de l'application lors d'actualisation de la page
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    } 
  ]
};
