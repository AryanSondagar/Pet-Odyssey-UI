import { Component, OnInit } from '@angular/core';
import { faCoffee,faDashboard } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {
    faCofee = faCoffee ;
    faDashboard = faDashboard ;
  constructor() { }

  ngOnInit(): void {
  }

}
