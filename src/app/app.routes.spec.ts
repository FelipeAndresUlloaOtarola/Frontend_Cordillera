import { MsalGuard } from '@azure/msal-angular';
import { routes } from './app.routes';

describe('app.routes', () => {
  it('protege las rutas privadas con MsalGuard', () => {
    const privateRoute = routes.find((route) => route.path === '');
    expect(privateRoute?.canActivate).toContain(MsalGuard);
    expect(privateRoute?.canActivateChild).toContain(MsalGuard);
  });

  it('deja la ruta de login fuera del guard', () => {
    const loginRoute = routes.find((route) => route.path === 'login');
    expect(loginRoute?.canActivate).toBeUndefined();
  });
});
