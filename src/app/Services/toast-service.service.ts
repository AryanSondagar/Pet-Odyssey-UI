import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToastServiceService {
   status: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  constructor() { }
  showToast(){

  }
}
