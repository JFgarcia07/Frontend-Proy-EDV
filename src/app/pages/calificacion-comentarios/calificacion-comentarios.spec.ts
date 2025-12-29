import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalificacionComentarios } from './calificacion-comentarios';

describe('CalificacionComentarios', () => {
  let component: CalificacionComentarios;
  let fixture: ComponentFixture<CalificacionComentarios>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalificacionComentarios]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalificacionComentarios);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
