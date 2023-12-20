import { Component } from '@angular/core';
import * as Highcharts from 'highcharts'

@Component({
  selector: 'app-sales-by-month',
  templateUrl: './sales-by-month.component.html',
  
  styleUrls: ['./sales-by-month.component.scss']
})
export class SalesByMonthComponent {
    highcharts = Highcharts ;
    
 
}
