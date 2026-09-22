import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface Sale {
  id: number;
  customerId?: number;
  branch?: string;
  amount: number;
  date: string;
  status?: string;
}

@Injectable({ providedIn: 'root' })
export class SalesService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiBaseUrl}/api/sales`;

  getAll(): Observable<Sale[]> {
    return this.http.get<Sale[]>(this.baseUrl);
  }

  create(payload: Partial<Sale>): Observable<Sale> {
    return this.http.post<Sale>(this.baseUrl, payload);
  }
}
