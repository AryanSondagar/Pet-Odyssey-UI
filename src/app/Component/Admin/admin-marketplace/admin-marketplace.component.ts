import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-admin-marketplace',
  templateUrl: './admin-marketplace.component.html',
  styleUrls: ['./admin-marketplace.component.scss'],
  
})
export class AdminMarketplaceComponent implements OnInit {
  hide = true;
  email = new FormControl('', [Validators.required, Validators.email]);
  imageUrl: string | undefined;
 

  constructor(private builder: FormBuilder) {}
  ngOnInit(): void {}

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }
  submit(data:object){
    console.log(data);
  }
  onImageSelected(event: any): void{
    const file: File = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imageUrl = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }
  

  
}
