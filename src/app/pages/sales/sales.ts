import { Component, OnInit, inject, signal } from '@angular/core';
import { Sale, SalesService } from '../../core/services/sales.service';
import { PageHeader } from '../../layout/page-header/page-header';
import { StatusBadge } from '../../shared/status-badge/status-badge';
import { formatCurrency, formatDateTime } from '../../core/utils/formatters';

@Component({
  selector: 'app-sales',
  imports: [PageHeader, StatusBadge],
  templateUrl: './sales.html',
})
export class Sales implements OnInit {
  private readonly salesService = inject(SalesService);

  protected readonly sales = signal<Sale[]>([]);
  protected readonly loading = signal(true);
  protected readonly error = signal('');

  protected readonly formatCurrency = formatCurrency;
  protected readonly formatDateTime = formatDateTime;

  ngOnInit(): void {
    this.salesService.getAll().subscribe({
      next: (data) => {
        this.sales.set(Array.isArray(data) ? data : []);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('No se pudieron cargar las ventas.');
        this.loading.set(false);
      },
    });
  }
}
