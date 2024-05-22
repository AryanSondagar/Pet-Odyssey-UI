import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { AdoptionForm } from 'src/app/Model/adoption.model';
import { AdminAdoptionService } from 'src/app/Services/admin-adoption.service';


@Component({
  selector: 'app-adoption-list',
  templateUrl: './adoption-list.component.html',
  styleUrl: './adoption-list.component.scss',
})
export class AdoptionListComponent implements OnInit, AfterViewInit{
  list: AdoptionForm[]=[] ;
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = new MatTableDataSource<AdoptionForm>(this.list);

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  constructor(private adoptionService: AdminAdoptionService){

  }
  ngOnInit(): void {
    this.adoptionService.getAllAdoptionPet().subscribe((res)=>{
      this.list = res ;
      console.log(res);
    })
  }
  
 
 }
