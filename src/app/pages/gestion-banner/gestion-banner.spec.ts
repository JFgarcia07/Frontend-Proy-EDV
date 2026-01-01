import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionBanner } from './gestion-banner';

describe('GestionBanner', () => {
  let component: GestionBanner;
  let fixture: ComponentFixture<GestionBanner>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionBanner]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionBanner);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
