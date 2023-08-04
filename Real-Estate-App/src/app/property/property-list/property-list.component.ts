import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IPropertyBase } from 'src/app/models/ipropertybase';
import { HousingService } from 'src/app/services/housing.service';

@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.css']
})
export class PropertyListComponent implements OnInit {
  SellRent: number = 1;
  Properties!: Array<IPropertyBase>;

  constructor(private route: ActivatedRoute, private housingAPI: HousingService) { }

  ngOnInit() {
    if (this.route.snapshot.url.toString()){
      this.SellRent = 2;        // 1 means base url and 2 means rent-property url
    }
    this.housingAPI.getAllProperties(this.SellRent).subscribe(data=>{
      this.Properties = data;
    },
    error=>{
      console.log(error);
    });
  }

}
