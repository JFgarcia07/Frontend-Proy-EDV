import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerGrupoFamiliar } from './ver-grupo-familiar';

describe('VerGrupoFamiliar', () => {
  let component: VerGrupoFamiliar;
  let fixture: ComponentFixture<VerGrupoFamiliar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerGrupoFamiliar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerGrupoFamiliar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
