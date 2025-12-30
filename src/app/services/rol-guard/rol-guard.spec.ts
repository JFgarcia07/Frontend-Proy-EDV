import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RolGuard } from './rol-guard';

describe('RolGuard', () => {
  let component: RolGuard;
  let fixture: ComponentFixture<RolGuard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RolGuard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RolGuard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
