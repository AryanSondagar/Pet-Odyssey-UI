import { ComponentFixture, TestBed } from '@angular/core/testing';
import 'src/test-setup';

import { SalesByMonthComponent } from './sales-by-month.component';

describe('SalesByMonthComponent', () => {
  let component: SalesByMonthComponent;
  let fixture: ComponentFixture<SalesByMonthComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SalesByMonthComponent]
    });
    fixture = TestBed.createComponent(SalesByMonthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
