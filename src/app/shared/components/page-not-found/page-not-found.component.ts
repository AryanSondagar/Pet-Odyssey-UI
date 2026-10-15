import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

declare function goDark(): any ;
declare function yetiTL(): any ;
@Component({
  selector: 'app-page-not-found',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss']
})
export class PageNotFoundComponent {
      ngOnInit(){
        if (typeof goDark === 'function') goDark();
        if (typeof yetiTL === 'function') yetiTL();
      }
}
