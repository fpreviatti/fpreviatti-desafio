import { Component, OnInit } from '@angular/core';


import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { CommonModule } from '@angular/common';
import { TransferenciaService } from '../../service/transferencia-service';

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
    MatAutocompleteModule
  ]
})
export class TransferenciaComponent implements OnInit {
    transferenciaForm!: FormGroup;
  beneficios: Beneficio[] = [];

  constructor(
    private fb: FormBuilder,
    private transferenciaService: TransferenciaService
  ) {}

  ngOnInit(): void {
    this.transferenciaForm = this.fb.group({
      beneficioOrigemId: [null, Validators.required], // quem envia
      beneficioDestinoId: [null, Validators.required], // quem recebe
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

  onSubmit() {
    if (this.transferenciaForm.valid) {
      const fromId = this.transferenciaForm.value.beneficioOrigemId; // remetente
      const toId = this.transferenciaForm.value.beneficioDestinoId;  // destinatário
      const amount = this.transferenciaForm.value.valor;

      this.transferenciaService.transfer(fromId, toId, amount)
        .subscribe({
          next: res => {
            alert(res); // "Transferência realizada"
            this.transferenciaForm.reset();

            // ⚡ Atualiza a lista de benefícios após a transferência
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
