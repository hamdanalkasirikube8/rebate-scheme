import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderResultsViewComponent } from './order-results-view.component';

describe('OrderResultsViewComponent', () => {
  let component: OrderResultsViewComponent;
  let fixture: ComponentFixture<OrderResultsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderResultsViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderResultsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
