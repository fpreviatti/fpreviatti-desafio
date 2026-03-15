import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, Routes } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { AppComponent } from './app/app.component';
import { importProvidersFrom } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { TransferenciaComponent } from './app/component/transferencia/transferencia.component';

export const routes: Routes = [
  { path: '', redirectTo: 'transferencia', pathMatch: 'full' },
  { path: 'transferencia', component: TransferenciaComponent }
];

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideAnimations(),
    importProvidersFrom(HttpClientModule)
  ]
})
  .catch(err => console.error(err));