import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MarketplaceForm } from 'src/app/Model/marketplace.model';
import { AdminMarketplaceService } from 'src/app/Services/admin-marketplace.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent implements OnInit {
  displayedColumns: string[] = ['productName', 'productCategory', 'productPrice', 'productStock'];
  dataSource!: MatTableDataSource<MarketplaceForm>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private productService: AdminMarketplaceService){}
  ngOnInit(): void {
    this.productService.getAllProduct().subscribe((res)=>{
      console.log(res);
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.sort = this.sort ;
      this.dataSource.paginator = this.paginator ;
      
    })
  }
}
