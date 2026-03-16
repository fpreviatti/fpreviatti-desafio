import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { TransferenciaComponent } from './transferencia.component';
import { TransferenciaService } from '../../service/transferencia-service';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';


describe('TransferenciaComponent', () => {
  let component: TransferenciaComponent;
  let fixture: ComponentFixture<TransferenciaComponent>;
  let mockService: any;
  let mockRouter: any;

  beforeEach(waitForAsync(() => {
    mockService = {
      getBeneficios: jest.fn().mockReturnValue(of([
        { id: 1, nome: 'A', descricao: 'd', valor: 100, ativo: true },
        { id: 2, nome: 'B', descricao: 'd', valor: 50, ativo: true },
        { id: 3, nome: 'C', descricao: 'd', valor: 0, ativo: false }
      ])),
      transfer: jest.fn().mockReturnValue(of('Transferência realizada'))
    };
    mockRouter = { navigate: jest.fn() };

    TestBed.configureTestingModule({
      imports: [TransferenciaComponent],
      providers: [
        { provide: TransferenciaService, useValue: mockService },
        { provide: Router, useValue: mockRouter }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(TransferenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('initial form is invalid and onSubmit does not call transfer', () => {
    expect(component.transferenciaForm.valid).toBeFalsy();
    component.onSubmit();
    expect(mockService.transfer).not.toHaveBeenCalled();
  });

  it('should call transfer when form is valid and refresh beneficios', () => {
    component.transferenciaForm.setValue({
      beneficioOrigemId: 1,
      beneficioDestinoId: 2,
      valor: 10,
      descricao: 'teste'
    });

    component.onSubmit();

    expect(mockService.transfer).toHaveBeenCalledWith(1, 2, 10);

    expect(mockService.getBeneficios).toHaveBeenCalled();
  });

  it('onSubmit error path shows alert', () => {
    window.alert = jest.fn();
    mockService.transfer.mockReturnValueOnce(throwError(() => new Error('fail')));
    component.transferenciaForm.setValue({
      beneficioOrigemId: 1,
      beneficioDestinoId: 2,
      valor: 10,
      descricao: ''
    });
    component.onSubmit();
    expect(window.alert).toHaveBeenCalledWith('Erro ao realizar transferência');
  });

  it('beneficiosParaOrigem / beneficiosParaDestinatario filter correctly', () => {
    component.beneficios = [
      { id: 1, nome: 'A', descricao: 'd', valor: 10, ativo: true },
      { id: 2, nome: 'B', descricao: 'd', valor: 20, ativo: true },
      { id: 3, nome: 'C', descricao: 'd', valor: 30, ativo: true }
    ];
    component.transferenciaForm.get('beneficioDestinoId')?.setValue(2);
    expect(component.beneficiosParaOrigem.find(b => b.id === 2)).toBeUndefined();
    component.transferenciaForm.get('beneficioOrigemId')?.setValue(1);
    expect(component.beneficiosParaDestinatario.find(b => b.id === 1)).toBeUndefined();
  });
});