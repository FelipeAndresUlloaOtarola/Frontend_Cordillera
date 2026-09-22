import { Component, OnInit, inject, signal } from '@angular/core';
import { DashboardData, DashboardService } from '../../core/services/dashboard.service';
import { PageHeader } from '../../layout/page-header/page-header';
import { KpiCard } from '../../shared/kpi-card/kpi-card';
import { StatusBadge } from '../../shared/status-badge/status-badge';
import { formatDateTime } from '../../core/utils/formatters';

@Component({
  selector: 'app-dashboard',
  imports: [PageHeader, KpiCard, StatusBadge],
  templateUrl: './dashboard.html',
})
export class Dashboard implements OnInit {
  private readonly dashboardService = inject(DashboardService);

  protected readonly data = signal<DashboardData | null>(null);
  protected readonly loading = signal(true);
  protected readonly error = signal('');

  protected readonly formatDateTime = formatDateTime;

  ngOnInit(): void {
    this.dashboardService.getDashboard().subscribe({
      next: (data) => {
        this.data.set(data);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('No se pudo cargar el dashboard.');
        this.loading.set(false);
      },
    });
  }
}
