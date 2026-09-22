import { Component, inject } from '@angular/core';
import { AuthService } from '../../core/auth/auth.service';

@Component({
  selector: 'app-login',
  template: `
    <div class="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <div class="w-full max-w-sm rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
        <h1 class="text-2xl font-bold text-slate-900">Grupo Cordillera</h1>
        <p class="mt-2 text-sm text-slate-500">Plataforma de gestión empresarial</p>
        <button
          type="button"
          (click)="authService.login()"
          class="mt-8 w-full rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-slate-800"
        >
          Iniciar sesión con Microsoft
        </button>
      </div>
    </div>
  `,
})
export class Login {
  protected readonly authService = inject(AuthService);
}
