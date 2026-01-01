import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JuegosGratis } from './juegos-gratis';

describe('JuegosGratis', () => {
  let component: JuegosGratis;
  let fixture: ComponentFixture<JuegosGratis>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JuegosGratis]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JuegosGratis);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
