import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, Routes } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { AppComponent } from './app/app.component';
import { TransferenciaComponentComponent } from './app/component/transferencia-component/transferencia-component.component';

export const routes: Routes = [
  { path: '', redirectTo: 'transferencia', pathMatch: 'full' },
  { path: 'transferencia', component: TransferenciaComponentComponent }
];

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideAnimations()
  ]
})
  .catch(err => console.error(err));