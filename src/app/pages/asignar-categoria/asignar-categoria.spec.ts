import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignarCategoria } from './asignar-categoria';

describe('AsignarCategoria', () => {
  let component: AsignarCategoria;
  let fixture: ComponentFixture<AsignarCategoria>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AsignarCategoria]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsignarCategoria);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
