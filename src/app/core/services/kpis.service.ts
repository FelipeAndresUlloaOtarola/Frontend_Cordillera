import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface Kpi {
  id: number;
  name: string;
  target?: number;
  unit?: string;
}

@Injectable({ providedIn: 'root' })
export class KpisService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiBaseUrl}/api/kpis`;

  getAll(): Observable<Kpi[]> {
    return this.http.get<Kpi[]>(this.baseUrl);
  }

  getResultByPeriod(periodoId: number | string): Observable<unknown> {
    return this.http.get(`${this.baseUrl}/periodo/${periodoId}`);
  }

  getLatestResult(id: number | string): Observable<unknown> {
    return this.http.get(`${this.baseUrl}/${id}/resultado`);
  }
}
