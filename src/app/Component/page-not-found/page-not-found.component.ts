import { Component } from '@angular/core';

declare function goDark(): any ;
declare function yetiTL(): any ;
@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss']
})
export class PageNotFoundComponent {
      ngOnInit(){
        goDark() ;
yetiTL();
      }
}
