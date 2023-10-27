import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-admin-marketplace',
  templateUrl: './admin-marketplace.component.html',
  styleUrls: ['./admin-marketplace.component.scss'],
  
})
export class AdminMarketplaceComponent implements OnInit {
  hide = true;

  constructor(private builder: FormBuilder) {}
  ngOnInit(): void {}



  
}
