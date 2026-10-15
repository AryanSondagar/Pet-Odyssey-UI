import { Component, OnInit, ViewChild } from '@angular/core';
import { StripeService, StripeCardComponent } from 'ngx-stripe';
import { StripeCardElementOptions, StripeElementsOptions } from '@stripe/stripe-js';
import { HttpClient } from '@angular/common/http';
import { CourseService } from '@core/services/course.service';
import { ActivatedRoute } from '@angular/router';
import { AlertService } from '@core/services/alert.service';
import { MarketplaceService } from '@core/services/marketplace.service';
import { Course } from '@shared/models/course.model';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-payment-stripe',
  templateUrl: './payment-stripe.component.html',
  styleUrl: './payment-stripe.component.scss'
})
export class PaymentStripeComponent implements OnInit {
  @ViewChild(StripeCardComponent) card!: StripeCardComponent;

  cardholderName: string = '';
  isProcessing: boolean = false;
  paymentSuccess: boolean = false;
  paymentError: string = '';
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  phone: string = '';
  address: string = '';
  city: string = '';
  pincode: string = '';
  saveCard: boolean = false;
  cardFocused: boolean = false;
  selectedTip: number = 0;
  customTip: number = 0;
  chargeId: string = '';
  formError: boolean = false;
  course?: Course | any;
  product: any;
  selectedSlot: string = '';
  paymentType: string = '';
  quantity: number = 1;
  private itemId: string = '';
  cardOptions: StripeCardElementOptions = {
    style: {
      base: {
        iconColor: '#666EE8',
        color: '#31325F',
        fontWeight: '300',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSize: '18px',
        '::placeholder': { color: '#CFD7E0' }
      }
    }
  };

  elementsOptions: StripeElementsOptions = {
    locale: 'en'
  };

  constructor(
    private stripeService: StripeService,
    private http: HttpClient,
    private route: ActivatedRoute,
    private courseService: CourseService,
    private alert: AlertService,
    private productService: MarketplaceService
  ) { }

  ngOnInit(): void {
    const type = this.route.snapshot.queryParamMap.get('type');
    const id = this.route.snapshot.queryParamMap.get('id');
    const qty = this.route.snapshot.queryParamMap.get('quantity');

    if (qty) this.quantity = +qty;
    console.log('type:', type, 'id:', id);
    if (type === 'course' && id) {
      this.loadCourse(id);
    } else if (type === 'product' && id) {
      this.loadProduct(id);
    }
  }
  loadCourse(id: string) {
    this.paymentType = 'course';
    this.itemId = id;
    this.courseService.getCourseById(id).subscribe({
      next: (res) => {
        this.selectedSlot = this.courseService.getSelectedSlot();
        this.course = res?.data;
        console.log(this.course);
      },
      error: (err) => console.error('Error loading course:', err)
    });
  }
  loadProduct(id: string) {
    this.paymentType = 'product';
    this.itemId = id;
    this.productService.getProductById(id).subscribe({
      next: (res: any) => {
        this.product = res.product;
        console.log('Product loaded:', this.product);
      },
      error: (err) => console.error('Error loading product:', err)
    });
  }

  get totalAmount(): number {
    return this.subtotal + this.gstAmount + this.selectedTip + this.customTip;
  }
  get gstAmount(): number {
    return this.subtotal * 0.18;
  }

  get subtotal(): number {
    if (this.paymentType === 'course') {
      return this.course?.price || 0;
    } else if (this.paymentType === 'product') {
       return (this.product?.productPrice || 0) * this.quantity;
    }
    return 0;
  }
  setTip(amount: number): void {
    this.selectedTip = amount;
    this.customTip = 0;
  }

  setCustomTip(): void {
    this.selectedTip = 0;
  }
  pay(): void {
    this.formError = false;
    if (
      !this.firstName ||
      !this.lastName ||
      !this.email ||
      !this.cardholderName ||
      !this.itemId ||
      !['course', 'product'].includes(this.paymentType)
    ) {
      this.formError = true;
      this.paymentError = 'Please select an item and fill all required fields';
      return;
    }

    this.isProcessing = true;
    this.paymentError = '';
    this.paymentSuccess = false;

    this.http.post<{ clientSecret: string; orderId: string }>(
      `${environment.apiUrl}/api/payments/create-intent`,
      {
        items: [{
          itemId: this.itemId,
          type: this.paymentType,
          quantity: this.paymentType === 'course' ? 1 : this.quantity
        }],
        tipAmount: this.selectedTip + this.customTip
      }
    ).subscribe({
      next: (response: any) => {
        this.stripeService.confirmCardPayment(response.clientSecret, {
          payment_method: {
            card: this.card.element,
            billing_details: {
              name: this.cardholderName,
              email: this.email,
              phone: this.phone || undefined,
              address: {
                line1: this.address || undefined,
                city: this.city || undefined,
                postal_code: this.pincode || undefined
              }
            }
          }
        }).subscribe({
          next: (result) => {
            if (result.error) {
              this.paymentError = result.error.message || 'Card payment failed';
              this.isProcessing = false;
            } else if (result.paymentIntent?.status === 'succeeded') {
              this.paymentSuccess = true;
              this.chargeId = result.paymentIntent.id;
              this.isProcessing = false;
              this.alert.ShowSuccess('Payment submitted successfully!');
            } else {
              this.paymentError = 'Payment has not completed';
              this.isProcessing = false;
            }
          },
          error: () => {
            this.paymentError = 'Unable to confirm payment';
            this.isProcessing = false;
          }
        });
      },
      error: (err) => {
        this.paymentError = err.error?.message || 'Unable to start payment';
        this.isProcessing = false;
      }
    });
  }
}
