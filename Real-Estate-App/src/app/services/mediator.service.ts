import { Injectable } from '@angular/core';
import { IPropertyBase } from '../models/ipropertybase';
import { HousingService } from './housing.service';

@Injectable({
  providedIn: 'root'
})

export class MediatorService {

  propertiesData!: Array<IPropertyBase>;

  constructor(private housingAPI: HousingService) {
    this.housingAPI.getAllProperties(1).subscribe(data=>{
      this.propertiesData = data;
    });
  }

  fetchPropertiesUnderTargetBHK = (targetBHK: number):string=>{
    let str = 'Please give proper BHK to see the properties details.';
    if (targetBHK){
      let listStr = `Properties Details under ${targetBHK} BHK:<ol>`;

      this.propertiesData.forEach((item)=>{
        let propBHK = item.BHK;
        if (propBHK && (propBHK <= targetBHK)){
          listStr = listStr + `<li>Property Name - <span class="help-line-color">${item.Name}</span>\nBHK - <span class="help-line-color">${item.BHK} BHK</span>\nType - <span class="help-line-color">${item.PType}</span>\nPrice - <span class="help-line-color">${item.Price} USD</span>\nBuilt Area - <span class="help-line-color">${item.BuiltArea} Sqr Feet</span></li>`;
        }
      });

      listStr = listStr + `</ol>`;
      
      if (listStr === `Properties Details under ${targetBHK} BHK:<ol></ol>`) str = `No properties available under ${targetBHK} BHK`;
      else str = listStr;
    }
    return str;
  }

  fetchPropertiesAboveTargetBHK = (targetBHK: number):string=>{
    let str = 'Please give proper BHK to see the properties details.';
    if (targetBHK){
      let listStr = `Properties Details above ${targetBHK} BHK:<ol>`;

      this.propertiesData.forEach((item)=>{
        let propBHK = item.BHK;
        if (propBHK && (propBHK > targetBHK)){
          listStr = listStr + `<li>Property Name - <span class="help-line-color">${item.Name}</span>\nBHK - <span class="help-line-color">${item.BHK} BHK</span>\nType - <span class="help-line-color">${item.PType}</span>\nPrice - <span class="help-line-color">${item.Price} USD</span>\nBuilt Area - <span class="help-line-color">${item.BuiltArea} Sqr Feet</span></li>`;
        }
      });

      listStr = listStr + `</ol>`;
      
      if (listStr === `Properties Details above ${targetBHK} BHK:<ol></ol>`) str = `No properties available above ${targetBHK} BHK`;
      else str = listStr;
    }
    return str;
  }

  fetchPropertiesofTargetBHK = (targetBHK: number|undefined):string=>{
    let str = 'Please give proper BHK to see the properties details.';
    if (targetBHK){
      let listStr = `Properties Details for ${targetBHK} BHK:<ol>`;

      this.propertiesData.forEach((item)=>{
        let propBHK = item.BHK;
        if (propBHK && (propBHK === targetBHK)){
          listStr = listStr + `<li>Property Name - <span class="help-line-color">${item.Name}</span>\nBHK - <span class="help-line-color">${item.BHK} BHK</span>\nType - <span class="help-line-color">${item.PType}</span>\nPrice - <span class="help-line-color">${item.Price} USD</span>\nBuilt Area - <span class="help-line-color">${item.BuiltArea} Sqr Feet</span></li>`;
        }
      });

      listStr = listStr + `</ol>`;

      if (listStr === `Properties Details for ${targetBHK} BHK:<ol></ol>`) str = `No properties available for ${targetBHK} BHK`;
      else str = listStr;
    }
    return str;
  }

  targetMethodObject: { [K: string]: Function } = {
    "fetch properties under target BHK": this.fetchPropertiesUnderTargetBHK,
    "fetch properties above target BHK": this.fetchPropertiesAboveTargetBHK,
    "fetch properties of target BHK": this.fetchPropertiesofTargetBHK
  }

  targetMethod(msgArr: string[], bhk?: number|undefined): string[]{
    let arr: string[] = [];
    for (let msg of msgArr){
      if (this.targetMethodObject[msg]){
        arr.push(this.targetMethodObject[msg](bhk));
      }
      else arr.push(msg);
    }
    return arr;
  }

}
