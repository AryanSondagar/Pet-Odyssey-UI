import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-adoption-form',
  templateUrl: './adoption-form.component.html',
  styleUrls: ['./adoption-form.component.scss']
})
export class AdoptionFormComponent {
  urls : string[] = []  ;
  
  SelectImage(event : any){
      if (event.target.files) {
        for(var i = 0; i<File.length ; i++){
          var reader = new FileReader()

          reader.readAsDataURL(event.target[i])

          reader.onload = (event: any) => {
            this.urls.push(event.target.result)
          }
        }
      }
  }
  FormSubmit(){

  }
}
