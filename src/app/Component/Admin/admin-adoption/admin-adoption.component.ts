import { Component, OnInit } from '@angular/core';
import {AfterViewInit, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';


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
 

}



export interface PeriodicElement {
  name: string;
  position: any;
  weight: any;
  symbol: string;
  action: any ;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 'Puppy', name: 'MM/DD/YYYY', weight: 'Bull Dog', symbol: 'Dog', action: 'delete'},
  {position: 'Luky', name: 'MM/DD/YYYY', weight: 'Labrador Dog', symbol:  'Dog', action: 'delete'},
  {position: 'Zoe', name: 'MM/DD/YYYY', weight: 'Husky Dog', symbol:  'Dog' , action: 'delete'},
  {position: 'Puffy', name: 'MM/DD/YYYY', weight: 'Beagle Dog', symbol: 'Dog' , action: 'delete'},
  {position: 'Penny', name: 'MM/DD/YYYY', weight: 'Birman' , symbol: 'Cat', action: 'delete'},
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