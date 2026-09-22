import { InteractionType } from '@azure/msal-browser';
import { MSALGuardConfigFactory, MSALInterceptorConfigFactory, apiScopeUri } from './auth-config';
import { environment } from '../../../environments/environment';

describe('auth-config', () => {
  it('el guard exige redirect y pide el scope del API', () => {
    const guardConfig = MSALGuardConfigFactory();
    expect(guardConfig.interactionType).toBe(InteractionType.Redirect);
    expect(guardConfig.authRequest).toEqual({ scopes: [apiScopeUri] });
  });

  it('el interceptor protege las llamadas al API base con el scope correcto', () => {
    const interceptorConfig = MSALInterceptorConfigFactory();
    const map = interceptorConfig.protectedResourceMap as Map<string, string[]>;
    expect(map.get(`${environment.apiBaseUrl}/*`)).toEqual([apiScopeUri]);
  });
});
