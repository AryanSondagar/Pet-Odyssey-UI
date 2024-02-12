import { Component, OnInit } from '@angular/core';
import { ToastServiceService } from 'src/app/Services/toast-service.service';

@Component({
  selector: 'app-toaster',
  templateUrl: './toaster.component.html',
  styleUrls: ['./toaster.component.scss'],
})
export class ToasterComponent implements OnInit {
  showToast = false;
  constructor(private toastr: ToastServiceService) {}

  ngOnInit(): void {
    this.showToast = true;
    this.toastr.status.subscribe((msg: string) =>{
      if(msg === null){
        this.showToast = true;
      }else{
        this.showToast = false;
      }
    })
  }
  closeToast() {
    this.showToast = false;
  }
}
