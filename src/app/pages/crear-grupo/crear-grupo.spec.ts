import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearGrupo } from './crear-grupo';

describe('CrearGrupo', () => {
  let component: CrearGrupo;
  let fixture: ComponentFixture<CrearGrupo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrearGrupo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearGrupo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
