import { Component, computed, input } from '@angular/core';
import { titleCase } from '../../core/utils/formatters';

const SUCCESS = ['COMPLETED', 'COMPLETADA', 'GENERADO', 'CUMPLIDO', 'IN STOCK'];
const WARNING = ['PENDING', 'PENDIENTE', 'EN_RIESGO', 'LOW STOCK'];
const DANGER = ['FLAGGED', 'ANULADA', 'ERROR', 'CRITICO'];
const INFO = ['EN_PROCESO'];

@Component({
  selector: 'app-status-badge',
  template: `
    <span class="inline-flex rounded-full px-3 py-1 text-xs font-semibold ring-1 {{ colorClass() }}">
      {{ label() }}
    </span>
  `,
})
export class StatusBadge {
  readonly status = input<string | null | undefined>(null);

  protected readonly label = computed(() => titleCase(this.status()));

  protected readonly colorClass = computed(() => {
    const normalized = this.status()?.toUpperCase();
    if (!normalized) {
      return 'bg-slate-100 text-slate-600 ring-slate-200';
    }
    if (SUCCESS.includes(normalized)) {
      return 'bg-emerald-50 text-emerald-700 ring-emerald-200';
    }
    if (WARNING.includes(normalized)) {
      return 'bg-yellow-50 text-yellow-700 ring-yellow-200';
    }
    if (DANGER.includes(normalized)) {
      return 'bg-red-50 text-red-700 ring-red-200';
    }
    if (INFO.includes(normalized)) {
      return 'bg-blue-50 text-blue-700 ring-blue-200';
    }
    return 'bg-slate-100 text-slate-600 ring-slate-200';
  });
}
