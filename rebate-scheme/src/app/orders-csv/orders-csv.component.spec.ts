import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersCsvComponent } from './orders-csv.component';

describe('OrdersCsvComponent', () => {
  let component: OrdersCsvComponent;
  let fixture: ComponentFixture<OrdersCsvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrdersCsvComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdersCsvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
