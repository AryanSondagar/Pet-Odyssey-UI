import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MarketplaceForm } from 'src/app/Model/marketplace.model';
import { AdminMarketplaceService } from 'src/app/Services/admin-marketplace.service';
import { AlertService } from 'src/app/Services/alert.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent implements OnInit {
  displayedColumns: string[] = ['productName', 'productCategory', 'productPrice', 'productStock', 'delete'];
  dataSource!: MatTableDataSource<MarketplaceForm>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private productService: AdminMarketplaceService, private alert: AlertService) { }
  ngOnInit(): void {
    this.productService.getAllProduct().subscribe((res) => {
      console.log(res);
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;

    })
  }
  onDelete(row: any) {
    this.productService.deleteProduct(row.id).subscribe({
      next: () => {
        this.alert.ShowDelete('Product Deleted Successfully!');
        this.dataSource.data = this.dataSource.data.filter(c => c.id !== row.id);
      },
      error: err => {
        console.error('Delete failed:', err);
      }
    });
  }
}
