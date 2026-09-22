import { Component, effect, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.html',
})
export class Login {
  protected readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  constructor() {
    effect(() => {
      if (this.authService.isAuthenticated()) {
        this.router.navigateByUrl('/dashboard');
      }
    });
  }
}
