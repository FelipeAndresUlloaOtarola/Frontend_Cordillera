import { ComponentFixture, TestBed } from '@angular/core/testing';
import { KpiCard } from './kpi-card';

describe('KpiCard', () => {
  let fixture: ComponentFixture<KpiCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KpiCard],
    }).compileComponents();

    fixture = TestBed.createComponent(KpiCard);
    fixture.componentRef.setInput('title', 'Total KPIs');
    fixture.componentRef.setInput('value', 12);
    fixture.componentRef.setInput('meta', '+3 vs mes anterior');
  });

  it('muestra el título y el valor recibidos', () => {
    fixture.detectChanges();
    const text = fixture.nativeElement.textContent as string;
    expect(text).toContain('Total KPIs');
    expect(text).toContain('12');
    expect(text).toContain('+3 vs mes anterior');
  });
});
