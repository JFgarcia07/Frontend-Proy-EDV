import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JuegosRecientes } from './juegos-recientes';

describe('JuegosRecientes', () => {
  let component: JuegosRecientes;
  let fixture: ComponentFixture<JuegosRecientes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JuegosRecientes]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JuegosRecientes);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
