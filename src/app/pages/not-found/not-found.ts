import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found',
  imports: [RouterLink],
  template: `
    <div class="flex min-h-screen flex-col items-center justify-center gap-4 bg-slate-50 text-center">
      <h1 class="text-4xl font-bold text-slate-900">404</h1>
      <p class="text-sm text-slate-500">La página que buscas no existe.</p>
      <a routerLink="/dashboard" class="text-sm font-semibold text-slate-900 underline">Volver al dashboard</a>
    </div>
  `,
})
export class NotFound {}
