import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerMasJuego } from './ver-mas-juego';

describe('VerMasJuego', () => {
  let component: VerMasJuego;
  let fixture: ComponentFixture<VerMasJuego>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerMasJuego]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerMasJuego);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
