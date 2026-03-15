import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { TransferenciaService } from '../../service/transferencia-service';
import { Router } from '@angular/router';
import { RealPipe } from '../../shared/real.pipe';
import { RealMaskDirective } from '../../shared/realmask-directive';

@Component({
  selector: 'beneficio',
  standalone: true,
  templateUrl: './beneficio.component.html',
  styleUrl: './beneficio.component.css',
    imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatAutocompleteModule,
    RealPipe,
    RealMaskDirective
  ]
})
export class BeneficioComponent {

  beneficios: Beneficio[] = [];
  beneficioForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private transferenciaService: TransferenciaService,
    private router: Router
  ) {}

  ngOnInit() {
    this.carregarBeneficios();

    this.beneficioForm = this.fb.group({
      nome: ['', Validators.required],
      valor: [null, [Validators.required, Validators.min(0.01),Validators.max(999999999999.99) ]],
      descricao: ['']
    });
  }

  carregarBeneficios() {
    this.transferenciaService.getBeneficios()
      .subscribe(data => this.beneficios = data.filter(b => b.ativo));
  }

  adicionar() {
    if (this.beneficioForm.valid) {
      const novo: Beneficio = this.beneficioForm.value;
      this.transferenciaService.addBeneficio(novo).subscribe(() => {
        this.carregarBeneficios();
        this.beneficioForm.reset();
      });
    }
  }

  remover(id: number) {
    if (confirm('Tem certeza que deseja remover este benefício?')) {
      this.transferenciaService.deleteBeneficio(id)
        .subscribe(() => this.carregarBeneficios());
    }
  }
}
