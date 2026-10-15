import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaymentStripeComponent } from './payment/payment-stripe.component';

const routes: Routes = [{ path: '', component: PaymentStripeComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CheckoutRoutingModule {}
