import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StatusBadge } from './status-badge';

describe('StatusBadge', () => {
  let fixture: ComponentFixture<StatusBadge>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatusBadge],
    }).compileComponents();

    fixture = TestBed.createComponent(StatusBadge);
  });

  it('usa el color de éxito para estados completados', () => {
    fixture.componentRef.setInput('status', 'COMPLETADA');
    fixture.detectChanges();
    const span: HTMLElement = fixture.nativeElement.querySelector('span');
    expect(span.className).toContain('emerald');
    expect(span.textContent?.trim()).toBe('Completada');
  });

  it('usa el color neutro para estados desconocidos', () => {
    fixture.componentRef.setInput('status', 'ALGO_RARO');
    fixture.detectChanges();
    const span: HTMLElement = fixture.nativeElement.querySelector('span');
    expect(span.className).toContain('slate');
  });
});
