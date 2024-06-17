import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { AdoptionForm } from 'src/app/Model/adoption.model';
import { AdminAdoptionService } from 'src/app/Services/admin-adoption.service';


@Component({
  selector: 'app-adoption-list',
  templateUrl: './adoption-list.component.html',
  styleUrl: './adoption-list.component.scss',
})
export class AdoptionListComponent implements OnInit{
  // list: AdoptionForm[]=[] ;
  displayedColumns: string[] = ['petName', 'petCategory', 'petBreed', 'petDOB'];
  dataSource!: MatTableDataSource<AdoptionForm>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  

  
  constructor(private adoptionService: AdminAdoptionService){

  }
  ngOnInit(): void {
   this.getAllAdoptionList();
  }
  getAllAdoptionList(){
    this.adoptionService.getAllAdoptionPet().subscribe((res)=>{
      console.log(res);
      // this.list = res ;
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.sort = this.sort ;
      this.dataSource.paginator = this.paginator ;
      
    })
  }
  
 
 }
