import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface Report {
  id: number;
  name: string;
  createdAt?: string;
  status?: string;
}

@Injectable({ providedIn: 'root' })
export class ReportsService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiBaseUrl}/api/reports`;

  getAll(): Observable<Report[]> {
    return this.http.get<Report[]>(this.baseUrl);
  }

  generate(payload: Record<string, unknown>): Observable<Report> {
    return this.http.post<Report>(`${this.baseUrl}/generate`, payload);
  }

  getById(id: number | string): Observable<Report> {
    return this.http.get<Report>(`${this.baseUrl}/${id}`);
  }
}
