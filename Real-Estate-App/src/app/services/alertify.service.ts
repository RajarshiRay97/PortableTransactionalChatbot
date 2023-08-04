import { Injectable } from '@angular/core';
import * as alertify from 'alertifyjs';

@Injectable({
  providedIn: 'root'
})
export class AlertifyService {

  constructor() { }

  success(msg: string){
    alertify.success(msg);
  }

  warning(msg: string){
    alertify.warning(msg);
  }

  error(msg: string){
    alertify.error(msg);
  }
}
