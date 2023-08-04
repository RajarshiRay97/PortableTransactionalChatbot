import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map} from 'rxjs/operators';
import { Observable } from 'rxjs';
import { IPropertyBase } from '../models/ipropertybase';
import { Property } from '../models/property';

@Injectable({
  providedIn: 'root'
})
export class HousingService {

  constructor(private http: HttpClient) { }

  getAllProperties(SellRent: number): Observable<IPropertyBase[]>{
    return this.http.get('data/properties.json').pipe(
      map(data=>{
        const PropertiesArray: Array<IPropertyBase> = [];

        let localPropArrInStr = localStorage.getItem('newProp');
        if (localPropArrInStr){
          let localPropArr = JSON.parse(localPropArrInStr);
          for (let prop of localPropArr){
            if (prop.SellRent === SellRent){
              PropertiesArray.push(prop);
            }
          }
        }

        for (const key in data){
          if (data.hasOwnProperty(key) && Object.values(data)[Number(key)].SellRent === SellRent){
            PropertiesArray.push(Object.values(data)[Number(key)]);
          }
        }
        return PropertiesArray;
      })
    );
  }

  addProperty(property: Property){
    let propertyArrInStr = localStorage.getItem('newProp');

    if (propertyArrInStr){
      let parsedPropArr = JSON.parse(propertyArrInStr);
      parsedPropArr.unshift(property);
      localStorage.setItem('newProp',JSON.stringify(parsedPropArr));
    }
    else{
      let propArr: Property[] = [property];
      localStorage.setItem('newProp',JSON.stringify(propArr));
    }
  }

  generateNewPropertyId(): number{
    let propIdInStr = localStorage.getItem('PID');
    if (propIdInStr){
      let newId: number = Number(propIdInStr)+1;
      localStorage.setItem('PID',String(newId));
      return newId;
    }
    else{
      localStorage.setItem('PID','101');
      return 101;
    }
  }
}
