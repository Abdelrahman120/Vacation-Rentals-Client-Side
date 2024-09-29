import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideDaterangepickerLocale } from "ngx-daterangepicker-bootstrap";

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes), provideHttpClient(),
    provideDaterangepickerLocale({
      separator: ' - ',
      applyLabel: 'Okay',
    })]
};
