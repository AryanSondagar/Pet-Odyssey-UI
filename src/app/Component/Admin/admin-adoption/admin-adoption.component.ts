import { Component, OnInit } from '@angular/core';
import {AfterViewInit, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { AdoptionFormComponent } from './adoption-form/adoption-form.component';

@Component({
  selector: 'app-admin-adoption',
  templateUrl: './admin-adoption.component.html',
  styleUrls: ['./admin-adoption.component.scss'],
  
})
export class AdminAdoptionComponent implements AfterViewInit{
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol' , 'action'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator |any ;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }
  openDialog(): void {
    this.dialog.open(AdoptionFormComponent);
  }

}



export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
  action: any ;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' , action: 'delete'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' , action: 'delete'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' , action: 'delete'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' , action: 'delete'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B' , action: 'delete'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' , action: 'delete'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' , action: 'delete'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' , action: 'delete'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' , action: 'delete'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' , action: 'delete'},
  {position: 11, name: 'Sodium', weight: 22.9897, symbol: 'Na' , action: 'delete'},
  {position: 12, name: 'Magnesium', weight: 24.305, symbol: 'Mg' , action: 'delete'},
  {position: 13, name: 'Aluminum', weight: 26.9815, symbol: 'Al' , action: 'delete'},
  {position: 14, name: 'Silicon', weight: 28.0855, symbol: 'Si' , action: 'delete'},
  {position: 15, name: 'Phosphorus', weight: 30.9738, symbol: 'P' , action: 'delete'},
  {position: 16, name: 'Sulfur', weight: 32.065, symbol: 'S' , action: 'delete'},
  {position: 17, name: 'Chlorine', weight: 35.453, symbol: 'Cl' , action: 'delete'},
  {position: 18, name: 'Argon', weight: 39.948, symbol: 'Ar' , action: 'delete'},
  {position: 19, name: 'Potassium', weight: 39.0983, symbol: 'K' , action: 'delete'},
  {position: 20, name: 'Calcium', weight: 40.078, symbol: 'Ca' , action: 'delete'},
];