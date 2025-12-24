import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionCategorias } from './gestion-categorias';

describe('GestionCategorias', () => {
  let component: GestionCategorias;
  let fixture: ComponentFixture<GestionCategorias>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionCategorias]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionCategorias);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
