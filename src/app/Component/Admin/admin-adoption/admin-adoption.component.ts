import { Component, OnInit } from '@angular/core';
import {AfterViewInit, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';

@Component({
  selector: 'app-admin-adoption',
  templateUrl: './admin-adoption.component.html',
  styleUrls: ['./admin-adoption.component.scss']
})
export class AdminAdoptionComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
