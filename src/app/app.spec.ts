import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { MSAL_INSTANCE, MsalBroadcastService, MsalService } from '@azure/msal-angular';
import { App } from './app';
import { MSALInstanceFactory } from './core/auth/auth-config';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [
        provideRouter([]),
        { provide: MSAL_INSTANCE, useFactory: MSALInstanceFactory },
        MsalService,
        MsalBroadcastService,
      ],
    }).compileComponents();
  });

  it('se crea correctamente e inicializa MSAL', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
    fixture.detectChanges();
  });
});
