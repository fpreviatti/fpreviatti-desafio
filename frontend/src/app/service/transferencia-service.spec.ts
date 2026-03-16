import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TransferenciaService } from './transferencia-service';

describe('TransferenciaService', () => {
  let service: TransferenciaService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TransferenciaService]
    });
    service = TestBed.inject(TransferenciaService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should post transfer and return string', () => {
    const from = 1;
    const to = 2;
    const amount = 50;
    const mockResp = 'ok';

    service.transfer(from, to, amount).subscribe(res => {
      expect(res).toBe(mockResp);
    });

    const req = httpMock.expectOne(r => r.method === 'POST' && r.url.endsWith('/transfer'));
    expect(req.request.params.get('fromId')).toBe(String(from));
    expect(req.request.params.get('toId')).toBe(String(to));
    expect(req.request.params.get('amount')).toBe(String(amount));
    req.flush(mockResp);
  });

  it('getBeneficios should GET array', () => {
    const mock = [{ id: 1, nome: 'A', descricao: 'd', valor: 10, ativo: true }];

    service.getBeneficios().subscribe(res => {
      expect(res).toEqual(mock);
    });

    const req = httpMock.expectOne(service['baseUrl']);
    expect(req.request.method).toBe('GET');
    req.flush(mock);
  });

  it('addBeneficio should POST and return beneficio', () => {
    const b = { id: 0, nome: 'X', descricao: 'd', valor: 10, ativo: true };

    service.addBeneficio(b).subscribe(res => {
      expect(res).toEqual(b);
    });

    const req = httpMock.expectOne(service['baseUrl']);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(b);
    req.flush(b);
  });

  it('deleteBeneficio should DELETE correct url', () => {
    service.deleteBeneficio(5).subscribe(res => {
      expect(res).toBeUndefined();
    });

    const req = httpMock.expectOne(`${service['baseUrl']}/5`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });

  it('transfer should propagate http error', () => {
    service.transfer(1, 2, 10).subscribe({
      next: () => { throw new Error('expected error'); },
      error: err => {
        expect(err.status).toBe(400);
        expect(err.statusText).toBe('Bad Request');
      }
    });

    const req = httpMock.expectOne(r => r.url.endsWith('/transfer'));
    req.flush({ message: 'err' }, { status: 400, statusText: 'Bad Request' });
  });
});