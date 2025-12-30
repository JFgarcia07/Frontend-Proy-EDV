import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionGruposFamiliares } from './gestion-grupos-familiares';

describe('GestionGruposFamiliares', () => {
  let component: GestionGruposFamiliares;
  let fixture: ComponentFixture<GestionGruposFamiliares>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionGruposFamiliares]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionGruposFamiliares);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
