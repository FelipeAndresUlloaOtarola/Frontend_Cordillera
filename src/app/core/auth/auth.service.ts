import { Injectable, computed, inject, signal } from '@angular/core';
import { AccountInfo, InteractionStatus } from '@azure/msal-browser';
import { MsalBroadcastService, MsalService } from '@azure/msal-angular';
import { filter } from 'rxjs/operators';
import { apiScopeUri } from './auth-config';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly msalService = inject(MsalService);
  private readonly broadcastService = inject(MsalBroadcastService);

  private readonly account = signal<AccountInfo | null>(this.msalService.instance.getActiveAccount());

  readonly isAuthenticated = computed(() => this.account() !== null);
  readonly displayName = computed(() => this.account()?.name ?? this.account()?.username ?? '');
  readonly roles = computed<string[]>(() => (this.account()?.idTokenClaims?.['roles'] as string[]) ?? []);
  readonly scopes = computed<string[]>(() => {
    const scp = this.account()?.idTokenClaims?.['scp'];
    return typeof scp === 'string' ? scp.split(' ') : [];
  });

  constructor() {
    this.broadcastService.inProgress$
      .pipe(filter((status) => status === InteractionStatus.None))
      .subscribe(() => {
        this.account.set(this.msalService.instance.getActiveAccount());
      });
  }

  hasRole(role: string): boolean {
    return this.roles().includes(role);
  }

  login(): void {
    this.msalService.loginRedirect({ scopes: [apiScopeUri] });
  }

  logout(): void {
    this.msalService.logoutRedirect();
  }
}
