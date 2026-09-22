import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/auth/auth.service';

interface NavItem {
  path: string;
  label: string;
}

const NAV_ITEMS: NavItem[] = [
  { path: '/dashboard', label: 'Dashboard' },
  { path: '/sales', label: 'Ventas' },
  { path: '/customers', label: 'Clientes' },
];

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive],
  template: `
    <aside class="flex h-full w-60 flex-col border-r border-slate-200 bg-white">
      <div class="px-6 py-5 text-lg font-bold text-slate-900">Grupo Cordillera</div>
      <nav class="flex-1 space-y-1 px-3">
        @for (item of navItems; track item.path) {
          <a
            [routerLink]="item.path"
            routerLinkActive="bg-slate-900 text-white"
            class="block rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100"
          >
            {{ item.label }}
          </a>
        }
      </nav>
      <div class="border-t border-slate-200 px-6 py-4">
        <p class="text-sm font-medium text-slate-900">{{ authService.displayName() }}</p>
        <p class="text-xs text-slate-500">{{ authService.roles().join(', ') || 'Sin rol asignado' }}</p>
        <button
          type="button"
          (click)="authService.logout()"
          class="mt-3 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:border-red-600 hover:bg-red-600 hover:text-white"
        >
          Cerrar sesión
        </button>
      </div>
    </aside>
  `,
})
export class Sidebar {
  protected readonly navItems = NAV_ITEMS;
  protected readonly authService = inject(AuthService);
}
