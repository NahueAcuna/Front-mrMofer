import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToiletList } from './toilet-list';

describe('ToiletList', () => {
  let component: ToiletList;
  let fixture: ComponentFixture<ToiletList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToiletList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ToiletList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
