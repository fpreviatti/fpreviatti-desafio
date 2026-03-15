import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root' // serviço global
})
export class TransferenciaService {

  // URL base do backend local
  private baseUrl = 'http://localhost:8080/api/v1/beneficios';

  constructor(private http: HttpClient) {}

  // Método para chamar a API de transferência
  transfer(fromId: number, toId: number, amount: number): Observable<string> {
    const params = new HttpParams()
      .set('fromId', fromId)
      .set('toId', toId)
      .set('amount', amount.toString());

    return this.http.post(`${this.baseUrl}/transfer`, null, { responseType: 'text', params });
  }

  getBeneficios(): Observable<Beneficio[]> {
    return this.http.get<Beneficio[]>(`${this.baseUrl}`); // GET /api/v1/beneficios
}
}