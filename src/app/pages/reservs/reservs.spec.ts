import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Reservs } from './reservs';

describe('Reservs', () => {
  let component: Reservs;
  let fixture: ComponentFixture<Reservs>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Reservs]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Reservs);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
