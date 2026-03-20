import { Component, OnInit, ViewChild } from '@angular/core';
import { StripeService, StripeCardComponent } from 'ngx-stripe';
import { StripeCardElementOptions, StripeElementsOptions } from '@stripe/stripe-js';
import { HttpClient } from '@angular/common/http';
import { AdminCourseService } from 'src/app/Services/admin-course.service';
import { ActivatedRoute } from '@angular/router';
import { Course } from 'src/app/Model/course.model';
import { AlertService } from 'src/app/Services/alert.service';
import { AdminMarketplaceService } from 'src/app/Services/admin-marketplace.service';
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
    private courseService: AdminCourseService,
    private alert: AlertService,
    private productService: AdminMarketplaceService
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
    this.courseService.getCourseById(id).subscribe({
      next: (res) => {
        this.selectedSlot = this.courseService.getSelectedSlot();
        this.course = res;
        console.log(this.course);
      },
      error: (err) => console.error('Error loading course:', err)
    });
  }
  loadProduct(id: string) {
    this.paymentType = 'product';
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
  get totalAmountInPaise(): number {
    return Math.round(this.totalAmount * 100);
  }

  pay(): void {
    this.formError = false;
    if (!this.firstName || !this.lastName || !this.email || !this.cardholderName) {
      this.formError = true;
      this.paymentError = 'Please fill all required fields';
      return;
    }

    this.isProcessing = true;
    this.paymentError = '';
    this.paymentSuccess = false;

    this.stripeService
      .createToken(this.card.element, { name: this.cardholderName })
      .subscribe({
        next: (result) => {
          if (result.token) {
            this.alert.ShowSuccess('Payment successful!');
            this.sendTokenToBackend(result.token.id);
          } else if (result.error) {
            this.paymentError = result.error.message || 'Card error';
            this.isProcessing = false;
          }
        },
        error: () => {
          this.paymentError = 'Something went wrong';
          this.isProcessing = false;
        }
      });
  }

  sendTokenToBackend(token: string): void {
    this.http.post('http://localhost:3000/api/payment/charge', {
      token: token,
      amount: this.totalAmountInPaise,
      currency: 'inr'
    }).subscribe({
      next: (response: any) => {
        this.paymentSuccess = true;
        this.isProcessing = false;
        this.chargeId = response.chargeId;
      },
      error: (err) => {
        this.paymentError = 'Payment failed on server';
        this.isProcessing = false;
      }
    });
  }
}
