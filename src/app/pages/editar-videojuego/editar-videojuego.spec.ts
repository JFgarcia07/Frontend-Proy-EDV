import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarVideojuego } from './editar-videojuego';

describe('EditarVideojuego', () => {
  let component: EditarVideojuego;
  let fixture: ComponentFixture<EditarVideojuego>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarVideojuego]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarVideojuego);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
