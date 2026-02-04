import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToiletForm } from './toilet-form';

describe('ToiletForm', () => {
  let component: ToiletForm;
  let fixture: ComponentFixture<ToiletForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToiletForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ToiletForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
