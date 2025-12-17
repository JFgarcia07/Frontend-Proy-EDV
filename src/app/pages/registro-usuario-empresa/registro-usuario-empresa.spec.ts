import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroUsuarioEmpresa } from './registro-usuario-empresa';

describe('RegistroUsuarioEmpresa', () => {
  let component: RegistroUsuarioEmpresa;
  let fixture: ComponentFixture<RegistroUsuarioEmpresa>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistroUsuarioEmpresa]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistroUsuarioEmpresa);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
