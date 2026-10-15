import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import 'src/test-setup';

import { PaymentStripeComponent } from './payment-stripe.component';

describe('PaymentStripeComponent', () => {
  let component: PaymentStripeComponent;
  let fixture: ComponentFixture<PaymentStripeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PaymentStripeComponent],
      schemas: [NO_ERRORS_SCHEMA],
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PaymentStripeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
