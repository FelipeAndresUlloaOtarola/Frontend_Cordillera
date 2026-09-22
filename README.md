# Grupo Cordillera — Frontend

SPA Angular (standalone) con autenticación vía Microsoft Entra ID (MSAL), que consume el backend de Grupo Cordillera a través de Azure API Management / BFF.

## Stack

- Angular 22 (standalone components, señales)
- `@azure/msal-angular` + `@azure/msal-browser` para login/logout OIDC y adjuntar el Bearer token
- Tailwind CSS
- Vitest (test runner por defecto del builder de Angular)

## Requisitos previos

- Node.js 20+
- Una app registration de tipo SPA en Entra ID (ver `src/environments/environment.ts`)

## Configuración

Completar en `src/environments/environment.ts` (dev) y `environment.prod.ts` (build de producción):

```
entra.spaClientId   -> Client ID de la app registration del SPA
entra.apiClientId   -> Client ID de la app registration del API (BFF)
entra.apiScope      -> nombre del scope expuesto por el API (ej. access_as_user)
apiBaseUrl          -> URL del API Management (o del Gateway/BFF local en dev)
```

Ninguno de estos valores es secreto (son públicos del lado cliente), pero igual no se commitean archivos `environment.*.local.ts` si se usan para overrides locales.

## Levantar en local

```bash
npm install
npm start
```

Abre `http://localhost:4200`. El login redirige a Entra ID real (tenant configurado en `environment.ts`); no hace falta nada público para probarlo en dev.

## Tests

```bash
npm test
```

## Build de producción

```bash
npm run build
```

Genera `dist/frontend/browser/`, servido por `Dockerfile`/`nginx.conf` o por Azure Static Web Apps.
