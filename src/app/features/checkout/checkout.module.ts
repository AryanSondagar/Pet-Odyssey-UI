import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxStripeModule } from 'ngx-stripe';
import { SharedModule } from '../../shared/shared.module';
import { CheckoutRoutingModule } from './checkout-routing.module';
import { PaymentStripeComponent } from './payment/payment-stripe.component';

@NgModule({
  declarations: [PaymentStripeComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxStripeModule,
    SharedModule,
    CheckoutRoutingModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CheckoutModule {}
