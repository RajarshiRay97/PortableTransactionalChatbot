import { Injectable } from '@angular/core';
@Injectable({

  providedIn: 'root'

})

// Designed for value-track

export class MediatorService {

  targetMethodObject: { [K: string]: Function } = {

  }
  constructor() {
  }
  
  targetMethod(msgArr: string[]): string[]{

    let arr: string[] = [];

    for (let msg of msgArr){

      if (this.targetMethodObject[msg]){

        arr.push(this.targetMethodObject[msg]());

      }

      else arr.push(msg);

    }

    return arr;

  }

}
