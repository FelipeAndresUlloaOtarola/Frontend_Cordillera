import { Component, OnInit, inject, signal } from '@angular/core';
import { Customer, CustomersService } from '../../core/services/customers.service';
import { PageHeader } from '../../layout/page-header/page-header';
import { formatDateTime, titleCase } from '../../core/utils/formatters';

@Component({
  selector: 'app-customers',
  imports: [PageHeader],
  templateUrl: './customers.html',
})
export class Customers implements OnInit {
  private readonly customersService = inject(CustomersService);

  protected readonly customers = signal<Customer[]>([]);
  protected readonly loading = signal(true);
  protected readonly error = signal('');

  protected readonly formatDateTime = formatDateTime;
  protected readonly titleCase = titleCase;

  ngOnInit(): void {
    this.customersService.getAll().subscribe({
      next: (data) => {
        this.customers.set(Array.isArray(data) ? data : []);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('No se pudieron cargar los clientes.');
        this.loading.set(false);
      },
    });
  }
}
