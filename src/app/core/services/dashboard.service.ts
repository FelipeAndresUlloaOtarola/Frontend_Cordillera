import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface Kpi {
  id: number;
  codigo: string;
  nombre: string;
  tipo: string;
  unidad: string;
  valorReal: number;
  valorMeta: number;
  porcentajeCumplimiento: number;
  estado: string;
}

export interface DashboardSummary {
  totalKpis: number;
  kpisCumplidos: number;
  kpisEnRiesgo: number;
  kpisCriticos: number;
  totalReportes: number;
  estadoIngestion: string;
}

export interface DashboardData {
  summary: DashboardSummary;
  kpis: Kpi[];
  reportesRecientes: unknown;
  estadoIngestion: unknown;
  degraded: boolean;
  serviciosDegradados: string[];
  generatedAt: string;
}

@Injectable({ providedIn: 'root' })
export class DashboardService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiBaseUrl}/api/dashboard`;

  getDashboard(): Observable<DashboardData> {
    return this.http.get<DashboardData>(this.baseUrl);
  }
}
