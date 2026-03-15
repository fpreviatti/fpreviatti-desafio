import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { CommonModule } from '@angular/common';
import { TransferenciaService } from '../../service/transferencia-service';

interface Usuario {
  id: number;
  nome: string;
}

@Component({
  selector: 'app-transferencia-component',
  standalone: true,
  templateUrl: './transferencia-component.component.html',
  styleUrls: ['./transferencia-component.component.css'],
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
export class TransferenciaComponentComponent implements OnInit {

  transferenciaForm!: FormGroup;
  usuarios: Usuario[] = [
    { id: 1, nome: 'João' },
    { id: 2, nome: 'Maria' },
    { id: 3, nome: 'Carlos' }
  ];
  usuarioFiltro: string = '';

  beneficios: Beneficio[] = [];

  constructor(private fb: FormBuilder, private transferenciaService: TransferenciaService) { }

  ngOnInit(): void {
    this.transferenciaForm = this.fb.group({
      usuarioDestino: [null, Validators.required],
      valor: [null, [Validators.required, Validators.min(0.01)]],
      descricao: ['']
    });
  }

  get usuariosFiltrados() {
    const valor = this.transferenciaForm?.get('usuarioDestino')?.value?.toLowerCase() || '';
    return this.usuarios.filter(u => u.nome.toLowerCase().includes(valor));
  }

  onSubmit() {
    if (this.transferenciaForm.valid) {
      const usuarioDestinoNome = this.transferenciaForm.value.usuarioDestino;
      const usuarioDestino = this.usuarios.find(u => u.nome === usuarioDestinoNome);
      if (!usuarioDestino) {
        alert('Usuário inválido');
        return;
      }

      const fromId = 1; // exemplo, você pode pegar do usuário logado
      const toId = usuarioDestino.id;
      const amount = this.transferenciaForm.value.valor;

      this.transferenciaService.transfer(fromId, toId, amount)
        .subscribe({
          next: (res) => {
            alert(res); // "Transferência realizada"
            this.transferenciaForm.reset();
          },
          error: (err) => {
            console.error(err);
            alert('Erro ao realizar transferência');
          }
        });
    }
  }
}