import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionEmpresaDesarrolladora } from './gestion-empresa-desarrolladora';

describe('GestionEmpresaDesarrolladora', () => {
  let component: GestionEmpresaDesarrolladora;
  let fixture: ComponentFixture<GestionEmpresaDesarrolladora>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionEmpresaDesarrolladora]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionEmpresaDesarrolladora);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
