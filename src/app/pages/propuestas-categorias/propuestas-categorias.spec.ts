import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropuestasCategorias } from './propuestas-categorias';

describe('PropuestasCategorias', () => {
  let component: PropuestasCategorias;
  let fixture: ComponentFixture<PropuestasCategorias>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PropuestasCategorias]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PropuestasCategorias);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
