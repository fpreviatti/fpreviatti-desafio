import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BeneficioComponent } from './beneficio.component';
import { TransferenciaService } from '../../service/transferencia-service';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Validators } from '@angular/forms';

describe('BeneficioComponent', () => {
  let component: BeneficioComponent;
  let fixture: ComponentFixture<BeneficioComponent>;
  let mockService: any;
  let mockRouter: any;

  beforeEach(async () => {
    mockService = {
      getBeneficios: jest.fn().mockReturnValue(of([])),
      addBeneficio: jest.fn().mockReturnValue(of({})),
      deleteBeneficio: jest.fn().mockReturnValue(of(void 0))
    };
    mockRouter = { navigate: jest.fn() };

    await TestBed.configureTestingModule({
      imports: [BeneficioComponent],
      providers: [
        { provide: TransferenciaService, useValue: mockService },
        { provide: Router, useValue: mockRouter }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(BeneficioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('carregarBeneficios should load only active beneficios', () => {
    const data = [
      { id: 1, nome: 'A', descricao: 'd', valor: 10, ativo: true },
      { id: 2, nome: 'B', descricao: 'd', valor: 20, ativo: false },
      { id: 3, nome: 'C', descricao: 'd', valor: 30, ativo: true }
    ];
    mockService.getBeneficios.mockReturnValueOnce(of(data));

    component.carregarBeneficios();

    expect(mockService.getBeneficios).toHaveBeenCalled();
    expect(component.beneficios.length).toBe(2);
    expect(component.beneficios.find(b => b.id === 2)).toBeUndefined();
  });

  it('atualizar should set beneficioSelecionado and patch form', () => {
    const b = { id: 5, nome: 'X', descricao: 'desc', valor: 99.9, ativo: true };
    component.beneficioForm = component['fb'].group({
      nome: [''],
      valor: [null],
      descricao: ['']
    });

    component.atualizar(b);

    expect(component.beneficioSelecionado).toBe(b);
    expect(component.beneficioForm.value.nome).toBe(b.nome);
    expect(component.beneficioForm.value.valor).toBe(b.valor);
  });

  it('adicionar should not call addBeneficio when form invalid', () => {
    component.beneficioForm = component['fb'].group({
      nome: ['', Validators.required],
      valor: [null, [Validators.required, Validators.min(0.01)]],
      descricao: ['']
    });

    component.adicionar();
    expect(mockService.addBeneficio).not.toHaveBeenCalled();
  });

  it('adicionar should call addBeneficio for new beneficio and refresh', () => {
    mockService.getBeneficios.mockClear();
    mockService.addBeneficio.mockClear();

    component.beneficioForm = component['fb'].group({
      nome: ['Novo', Validators.required],
      valor: [123, [Validators.required, Validators.min(0.01)]],
      descricao: ['desc']
    });

    component.adicionar();

    expect(mockService.addBeneficio).toHaveBeenCalled();
    expect(mockService.getBeneficios).toHaveBeenCalled();

    expect(component.beneficioForm.value.nome).toBeNull();
  });

  it('adicionar should update existing beneficio when beneficioSelecionado is set', () => {
    mockService.getBeneficios.mockClear();
    component.beneficioSelecionado = { id: 99, nome: 'Old', descricao: '', valor: 1, ativo: true } as any;
    component.beneficioForm = component['fb'].group({
      nome: ['Updated', Validators.required],
      valor: [10, [Validators.required, Validators.min(0.01)]],
      descricao: ['d']
    });

    component.adicionar();

    expect(mockService.addBeneficio).toHaveBeenCalled();
    const calledArg = mockService.addBeneficio.mock.calls[0][0];
    expect(calledArg.id).toBe(99);
    expect(component.beneficioSelecionado).toBeNull();
  });

  it('remover should call deleteBeneficio when confirmed and refresh', () => {
    const spyConfirm = jest.spyOn(window, 'confirm').mockReturnValue(true);
    mockService.getBeneficios.mockClear();
    mockService.deleteBeneficio.mockClear();

    component.remover(7);

    expect(spyConfirm).toHaveBeenCalled();
    expect(mockService.deleteBeneficio).toHaveBeenCalledWith(7);
    expect(mockService.getBeneficios).toHaveBeenCalled();
    spyConfirm.mockRestore();
  });

  it('remover should not call deleteBeneficio when cancelled', () => {
    const spyConfirm = jest.spyOn(window, 'confirm').mockReturnValue(false);
    mockService.deleteBeneficio.mockClear();

    component.remover(8);

    expect(mockService.deleteBeneficio).not.toHaveBeenCalled();
    spyConfirm.mockRestore();
  });

  it('carregarBeneficios handles service error gracefully', () => {
    mockService.getBeneficios.mockReturnValueOnce(throwError(() => new Error('fail')));
    expect(() => component.carregarBeneficios()).not.toThrow();
  });
});