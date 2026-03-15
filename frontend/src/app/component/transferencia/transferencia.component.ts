import { Component, OnInit } from '@angular/core';


import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { CommonModule } from '@angular/common';
import { TransferenciaService } from '../../service/transferencia-service';
import { Router } from '@angular/router';
import { RealPipe } from '../../shared/real.pipe';

@Component({
  selector: 'transferencia',
  standalone: true,
  templateUrl: './transferencia.component.html',
  styleUrl: './transferencia.component.css',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatAutocompleteModule,
    RealPipe
  ]
})
export class TransferenciaComponent implements OnInit {
    transferenciaForm!: FormGroup;
  beneficios: Beneficio[] = [];

  constructor(
    private fb: FormBuilder,
    private transferenciaService: TransferenciaService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.transferenciaForm = this.fb.group({
      beneficioOrigemId: [null, Validators.required],
      beneficioDestinoId: [null, Validators.required],
      valor: [null, [Validators.required, Validators.min(0.01)]],
      descricao: ['']
    });

    this.transferenciaService.getBeneficios()
      .subscribe(data => this.beneficios = data.filter(b => b.ativo));
  }

  get beneficiosParaOrigem() {
    const destinoId = this.transferenciaForm.get('beneficioDestinoId')?.value;
    return this.beneficios.filter(b => b.id !== destinoId);
  }

  get beneficiosParaDestinatario() {
    const origemId = this.transferenciaForm.get('beneficioOrigemId')?.value;
    return this.beneficios.filter(b => b.id !== origemId);
  }

  gerenciarBeneficios() {
    this.router.navigate(['/beneficio']);
  }

  removerBeneficio() {
    this.router.navigate(['/beneficio']);
  }

  onSubmit() {
    if (this.transferenciaForm.valid) {
      const fromId = this.transferenciaForm.value.beneficioOrigemId;
      const toId = this.transferenciaForm.value.beneficioDestinoId;
      const amount = this.transferenciaForm.value.valor;

      this.transferenciaService.transfer(fromId, toId, amount)
        .subscribe({
          next: res => {
            alert(res); 
            this.transferenciaForm.reset();

            this.transferenciaService.getBeneficios()
              .subscribe(data => this.beneficios = data.filter(b => b.ativo));
          },
          error: err => {
            console.error(err);
            alert('Erro ao realizar transferência');
          }
        });
    }
  }
}
