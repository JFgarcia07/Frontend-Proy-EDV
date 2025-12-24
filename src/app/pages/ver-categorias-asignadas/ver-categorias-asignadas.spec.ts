import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerCategoriasAsignadas } from './ver-categorias-asignadas';

describe('VerCategoriasAsignadas', () => {
  let component: VerCategoriasAsignadas;
  let fixture: ComponentFixture<VerCategoriasAsignadas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerCategoriasAsignadas]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerCategoriasAsignadas);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
