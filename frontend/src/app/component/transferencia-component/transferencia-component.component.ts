import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { CommonModule } from '@angular/common';

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

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.transferenciaForm = this.fb.group({
      usuarioDestino: [null, Validators.required],
      valor: [null, [Validators.required, Validators.min(0.01)]],
      descricao: ['']
    });
  }

  realizarTransferencia() {
    if (this.transferenciaForm.valid) {
      console.log('Transferência realizada:', this.transferenciaForm.value);
      alert('Transferência realizada com sucesso!');
      this.transferenciaForm.reset();
    }
  }

  get usuariosFiltrados() {
    return this.usuarios.filter(u => u.nome.toLowerCase().includes(this.usuarioFiltro.toLowerCase()));
  }

  onSubmit() {
    if (this.transferenciaForm.valid) {
      const transferenciaData = this.transferenciaForm.value;
      console.log('Dados da transferência:', transferenciaData);
      alert('Transferência realizada com sucesso!');
      this.transferenciaForm.reset();
    }
  }
}