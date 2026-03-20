import { Injectable } from '@angular/core';
import Swal, { SweetAlertIcon } from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor() { }
  showToast(message: string, icon: SweetAlertIcon = 'success', timer: number = 3000) {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',   // 👈 top-right
      showConfirmButton: false,
      timer,
      timerProgressBar: true,
    });
    return Toast.fire({
      icon,
      title: message,
    });
  }
  ShowSuccess(message: string) {
    return this.showToast(message, 'success');
  }
  ShowError(message: string) {
    return this.showToast(message, 'error');
  }
  ShowDelete(message: string) {
    return this.showToast(message, 'warning');
  }
}
