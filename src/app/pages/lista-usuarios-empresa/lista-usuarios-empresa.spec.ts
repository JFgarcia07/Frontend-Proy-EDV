import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaUsuariosEmpresa } from './lista-usuarios-empresa';

describe('ListaUsuariosEmpresa', () => {
  let component: ListaUsuariosEmpresa;
  let fixture: ComponentFixture<ListaUsuariosEmpresa>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaUsuariosEmpresa]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaUsuariosEmpresa);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
