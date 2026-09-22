import { Component, input } from '@angular/core';

@Component({
  selector: 'app-kpi-card',
  template: `
    <div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <p class="text-sm font-medium text-slate-500">{{ title() }}</p>
      <p class="mt-3 text-3xl font-bold text-slate-900">{{ value() }}</p>
      <p class="mt-3 text-sm font-semibold" [class]="tone()">{{ meta() }}</p>
    </div>
  `,
})
export class KpiCard {
  readonly title = input.required<string>();
  readonly value = input.required<string | number>();
  readonly meta = input<string>('');
  readonly tone = input<string>('text-slate-500');
}
