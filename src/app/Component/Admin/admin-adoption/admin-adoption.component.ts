import { Component, OnInit } from '@angular/core';


import { AdoptionForm } from 'src/app/Model/adoption.model';
import { AdminAdoptionService } from 'src/app/Services/admin-adoption.service';


@Component({
  selector: 'app-admin-adoption',
  templateUrl: './admin-adoption.component.html',
  styleUrls: ['./admin-adoption.component.scss'],
  
})
export class AdminAdoptionComponent implements OnInit{


  
  constructor(private adoptionService: AdminAdoptionService) { }

  ngOnInit(): void {}
  showToast(){}

}

