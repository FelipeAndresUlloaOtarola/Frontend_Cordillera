import { Injectable, computed, inject, signal } from '@angular/core';
import { AccountInfo, InteractionStatus } from '@azure/msal-browser';
import { MsalBroadcastService, MsalService } from '@azure/msal-angular';
import { filter } from 'rxjs/operators';
import { apiScopeUri } from './auth-config';

function decodeJwtClaims(token: string): Record<string, unknown> {
  const payload = token.split('.')[1];
  const normalized = payload.replace(/-/g, '+').replace(/_/g, '/');
  const padded = normalized.padEnd(normalized.length + ((4 - (normalized.length % 4)) % 4), '=');
  return JSON.parse(atob(padded));
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly msalService = inject(MsalService);
  private readonly broadcastService = inject(MsalBroadcastService);

  private readonly account = signal<AccountInfo | null>(this.msalService.instance.getActiveAccount());
  private readonly apiClaims = signal<Record<string, unknown> | null>(null);

  readonly isAuthenticated = computed(() => this.account() !== null);
  readonly displayName = computed(() => this.account()?.name ?? this.account()?.username ?? '');
  readonly roles = computed<string[]>(() => (this.apiClaims()?.['roles'] as string[]) ?? []);
  readonly scopes = computed<string[]>(() => {
    const scp = this.apiClaims()?.['scp'];
    return typeof scp === 'string' ? scp.split(' ') : [];
  });

  constructor() {
    this.broadcastService.inProgress$
      .pipe(filter((status) => status === InteractionStatus.None))
      .subscribe(() => {
        const activeAccount = this.msalService.instance.getActiveAccount();
        this.account.set(activeAccount);
        if (activeAccount) {
          this.loadApiClaims(activeAccount);
        } else {
          this.apiClaims.set(null);
        }
      });
  }

  private loadApiClaims(account: AccountInfo): void {
    this.msalService.instance
      .acquireTokenSilent({ scopes: [apiScopeUri], account })
      .then((result) => this.apiClaims.set(decodeJwtClaims(result.accessToken)))
      .catch((error) => {
        console.error('No se pudo obtener el token del API para leer roles/scopes', error);
        this.apiClaims.set(null);
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
