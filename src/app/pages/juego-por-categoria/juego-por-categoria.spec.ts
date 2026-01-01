import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JuegoPorCategoria } from './juego-por-categoria';

describe('JuegoPorCategoria', () => {
  let component: JuegoPorCategoria;
  let fixture: ComponentFixture<JuegoPorCategoria>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JuegoPorCategoria]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JuegoPorCategoria);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
