import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TransferenciaComponentComponent } from './component/transferencia-component/transferencia-component.component';

const routes: Routes = [
  { path: 'transferencia', component: TransferenciaComponentComponent },
  { path: '', redirectTo: 'transferencia', pathMatch: 'full' }, // rota padrão
  { path: '**', redirectTo: 'transferencia' } // rota fallback
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }