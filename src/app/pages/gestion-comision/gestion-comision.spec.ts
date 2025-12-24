import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionComision } from './gestion-comision';

describe('GestionComision', () => {
  let component: GestionComision;
  let fixture: ComponentFixture<GestionComision>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionComision]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionComision);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
