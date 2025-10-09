import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MarketplaceForm } from 'src/app/Model/marketplace.model';
import { AdminMarketplaceService } from 'src/app/Services/admin-marketplace.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent {
  product?: MarketplaceForm;
  mainImage: any = '';


  constructor(private productService: AdminMarketplaceService, private route: ActivatedRoute) { }
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.productService.getProductById(id).subscribe({
        next: (res) => {
          this.product = res;
          if (this.product?.productImages?.length > 0) {
            this.mainImage = this.getImageUrl(this.product.productImages[0]);
          }
          console.log(this.product);
        },
        error: (err) => console.error('Error loading course:', err)
      });
    }
  }
  getImageUrl(img: any): string {
    // Prepend the host if your imageUrl is relative
    return 'http://localhost:5093' + img.imageUrl;
  }
  changeImage(img: any) {
    this.mainImage = this.getImageUrl(img);
  }

}
