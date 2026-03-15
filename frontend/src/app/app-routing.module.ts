import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TransferenciaComponent } from './component/transferencia/transferencia.component';

const routes: Routes = [
  { path: 'transferencia', component: TransferenciaComponent },
  { path: '', redirectTo: 'transferencia', pathMatch: 'full' },
  { path: '**', redirectTo: 'transferencia', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }