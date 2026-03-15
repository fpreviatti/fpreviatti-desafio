import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransferenciaService {

  private baseUrl = 'http://localhost:8080/api/v1/beneficios';

  constructor(private http: HttpClient) {}

  transfer(fromId: number, toId: number, amount: number): Observable<string> {
    const params = new HttpParams()
      .set('fromId', fromId)
      .set('toId', toId)
      .set('amount', amount.toString());

    return this.http.post(`${this.baseUrl}/transfer`, null, { responseType: 'text', params });
  }

  getBeneficios(): Observable<Beneficio[]> {
    return this.http.get<Beneficio[]>(`${this.baseUrl}`);
}

}