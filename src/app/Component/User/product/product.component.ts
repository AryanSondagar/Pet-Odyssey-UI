import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MarketplaceForm } from 'src/app/Model/marketplace.model';
import { AdminMarketplaceService } from 'src/app/Services/admin-marketplace.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent {
  product?: MarketplaceForm;
  mainImage: any = '';


  constructor(private productService: AdminMarketplaceService, private route: ActivatedRoute, private routes: Router) { }
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.productService.getProductById(id).subscribe({
        next: (res: any) => {
          this.product = res.product;
          if (this.product && this.product.productImages?.length) {
            this.mainImage = this.getImageUrl(this.product.productImages[0]);
          }
          console.log(this.product);
        },
        error: (err) => console.error('Error loading course:', err)
      });
    }
  }
  getImageUrl(img: any): string {
    if (!img) return '';
    const url = typeof img === 'string' ? img : img.url;

    if (/^https?:\/\//i.test(url)) {
      return url;
    }

    return `${environment.apiUrl}/${url.replace(/\\/g, '/')}`;
  }
  changeImage(img: any) {
    this.mainImage = this.getImageUrl(img);
  }
  quantity: number = 1;

  increaseQty(): void {
    if (this.quantity < (this.product?.productStock || 10)) {
      this.quantity++;
    }
  }

  decreaseQty(): void {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  buyNow(): void {
    this.routes.navigate(['/payment'], {
      queryParams: { type: 'product', id: this.product._id, quantity: this.quantity }
    });
  }
  GotoHome() {
    this.routes.navigate(['']);
  }

}
