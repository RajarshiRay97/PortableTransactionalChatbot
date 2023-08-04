import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TabsetComponent } from 'ngx-bootstrap/tabs';
import { IPropertyBase } from 'src/app/models/ipropertybase';
import { Property } from 'src/app/models/property';
import { AlertifyService } from 'src/app/services/alertify.service';
import { HousingService } from 'src/app/services/housing.service';

@Component({
  selector: 'app-add-property',
  templateUrl: './add-property.component.html',
  styleUrls: ['./add-property.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AddPropertyComponent implements OnInit {
  @ViewChild('formTabs') formTabs?: TabsetComponent;

  addPropertyForm !: FormGroup;
  nextClicked: boolean = false;
  property: Property = new Property();

  propertyView: IPropertyBase = {
    Id: null,
    Name: null,
    SellRent: null,
    PType: null,
    FType: null,
    Price: null,
    BHK: null,
    BuiltArea: null,
    City: null,
    RTM: null
  };

  propertyTypes: string[] = ['House', 'Apartment', 'Duplex'];
  furnishTypes: string[] = ['Full', 'Semi', 'Unfurnished'];
  mainEntrances: string[] = ['East', 'West', 'North', 'South'];

  constructor(private router: Router,
    private fb: FormBuilder,
    private housingService: HousingService,
    private alertify: AlertifyService) { }

  ngOnInit() {
    this.createAddPropertyForm();
  }

  createAddPropertyForm(){
    this.addPropertyForm = this.fb.group({
      BasicInfo: this.fb.group({
        SellRent: ['1', Validators.required],
        BHK: [null, Validators.required],
        PType: [null, Validators.required],
        FType: [null, Validators.required],
        Name: [null, Validators.required],
        City: [null, Validators.required]
      }),
      PriceInfo: this.fb.group({
        Price: [null, [Validators.required, Validators.pattern('\\d+(\\.\\d+)?$')]],
        BuiltArea: [null, [Validators.required, Validators.pattern('\\d+(\\.\\d+)?$')]],
        CarpetArea: [null, Validators.pattern('\\d+(\\.\\d+)?$')],
        Security: [null, Validators.pattern('\\d+(\\.\\d+)?$')],
        Maintenance: [null, Validators.pattern('\\d+(\\.\\d+)?$')]
      }),
      AddressInfo: this.fb.group({
        FloorNo: [null],
        TotalFloor: [null],
        Address: [null, Validators.required],
        LandMark: [null]
      }),
      OtherInfo: this.fb.group({
        RTM: [null, Validators.required],
        PosessionOn: [null],
        AOP: [null],
        Gated: [null],
        MainEntrance: [null],
        Description: [null]
      })
    });
  }

  // Getter Methods for FormGroup
  //#region <Form Groups>
  get BasicInfo(){
    return this.addPropertyForm.controls['BasicInfo'] as FormGroup;
  }
  get PriceInfo(){
    return this.addPropertyForm.controls['PriceInfo'] as FormGroup;
  }
  get AddressInfo(){
    return this.addPropertyForm.controls['AddressInfo'] as FormGroup;
  }
  get OtherInfo(){
    return this.addPropertyForm.controls['OtherInfo'] as FormGroup;
  }
  //#endregion

  // Getter Methods for FormControl
  // #region <Form Controls>
  // BasicInfo
  get SellRent(){
    return this.BasicInfo.controls['SellRent'] as FormControl;
  }
  get BHK(){
    return this.BasicInfo.controls['BHK'] as FormControl;
  }
  get PType(){
    return this.BasicInfo.controls['PType'] as FormControl;
  }
  get FType(){
    return this.BasicInfo.controls['FType'] as FormControl;
  }
  get Name(){
    return this.BasicInfo.controls['Name'] as FormControl;
  }
  get City(){
    return this.BasicInfo.controls['City'] as FormControl;
  }
  // PriceInfo
  get Price(){
    return this.PriceInfo.controls['Price'] as FormControl;
  }
  get BuiltArea(){
    return this.PriceInfo.controls['BuiltArea'] as FormControl;
  }
  get CarpetArea(){
    return this.PriceInfo.controls['CarpetArea'] as FormControl;
  }
  get Security(){
    return this.PriceInfo.controls['Security'] as FormControl;
  }
  get Maintenance(){
    return this.PriceInfo.controls['Maintenance'] as FormControl;
  }
  // AddressInfo
  get FloorNo(){
    return this.AddressInfo.controls['FloorNo'] as FormControl;
  }
  get TotalFloor(){
    return this.AddressInfo.controls['TotalFloor'] as FormControl;
  }
  get Address(){
    return this.AddressInfo.controls['Address'] as FormControl;
  }
  get LandMark(){
    return this.AddressInfo.controls['LandMark'] as FormControl;
  }
  // OtherInfo
  get RTM(){
    return this.OtherInfo.controls['RTM'] as FormControl;
  }
  get PosessionOn(){
    return this.OtherInfo.controls['PosessionOn'] as FormControl;
  }
  get AOP(){
    return this.OtherInfo.controls['AOP'] as FormControl;
  }
  get Gated(){
    return this.OtherInfo.controls['Gated'] as FormControl;
  }
  get MainEntrance(){
    return this.OtherInfo.controls['MainEntrance'] as FormControl;
  }
  get Description(){
    return this.OtherInfo.controls['Description'] as FormControl;
  }
  //#endregion

  allTabsValid(): boolean{
    let tempFormTabs = this.formTabs;
    if (tempFormTabs){
      if (this.BasicInfo.invalid){
        tempFormTabs.tabs[0].active = true;
        return false;
      }
      if (this.PriceInfo.invalid){
        tempFormTabs.tabs[1].active = true;
        return false;
      }
      if (this.AddressInfo.invalid){
        tempFormTabs.tabs[2].active = true;
        return false;
      }
      if (this.OtherInfo.invalid){
        tempFormTabs.tabs[3].active = true;
        return false;
      }
      return true;
    }
    else return false;
  }

  onSubmit(){
    this.nextClicked = true;
    if (this.allTabsValid()){
      this.mapProperty();
      this.housingService.addProperty(this.property);
      this.alertify.success('Congrats! Your property listed successfully on our website');

      if (this.SellRent.value === '2'){
        this.router.navigate(['/rent-property']);
      }
      else{
        this.router.navigate(['/']);
      }

      console.log(this.addPropertyForm);
    }
    else{
      this.alertify.error('Oops...! Please review the form and provide all valid entries');
    }
  }

  mapProperty(): void{
    this.property.Id = this.housingService.generateNewPropertyId();
    this.property.SellRent = Number(this.SellRent.value);
    this.property.BHK = Number(this.BHK.value);
    this.property.PType = this.PType.value;
    this.property.FType = this.FType.value;
    this.property.Name = this.Name.value;
    this.property.City = this.City.value;
    this.property.Price = Number(this.Price.value);
    this.property.BuiltArea = Number(this.BuiltArea.value);
    this.property.CarpetArea = this.CarpetArea.value?Number(this.CarpetArea.value):this.CarpetArea.value;
    this.property.Security = this.Security.value?Number(this.Security.value):this.Security.value;
    this.property.Maintenance = this.Maintenance.value?Number(this.Maintenance.value):this.Maintenance.value;
    this.property.FloorNo = this.FloorNo.value;
    this.property.TotalFloor = this.TotalFloor.value;
    this.property.Address = this.Address.value;
    this.property.LandMark = this.LandMark.value;
    this.property.RTM = Number(this.RTM.value);
    this.property.PosessionOn = this.PosessionOn.value?this.PosessionOn.value.toString():this.PosessionOn.value;
    this.property.AOP = this.AOP.value;
    this.property.Gated = this.Gated.value?Number(this.Gated.value):this.Gated.value;
    this.property.MainEntrance = this.MainEntrance.value;
    this.property.Description = this.Description.value;
    this.property.PostedOn = new Date().toString();
  }

  selectTab(tabId: number, isCurrentTabValid: boolean) {
    this.nextClicked = true;
    if (this.formTabs?.tabs[tabId] && isCurrentTabValid) {
      this.formTabs.tabs[tabId].active = true;
    }
  }

  previewStatus(){
    return (Boolean(this.propertyView.Name) || Boolean(this.propertyView.PType) || Boolean(this.propertyView.FType) || Boolean(this.propertyView.Price) || Boolean(this.propertyView.BHK) || Boolean(this.propertyView.BuiltArea) || Boolean(this.propertyView.City));
  }
}
