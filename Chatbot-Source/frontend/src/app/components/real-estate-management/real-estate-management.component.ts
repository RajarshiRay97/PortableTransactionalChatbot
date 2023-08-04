import { Component } from '@angular/core';

@Component({
  selector: 'app-real-estate-management',
  templateUrl: './real-estate-management.component.html',
  styleUrls: ['./real-estate-management.component.css']
})
export class RealEstateManagementComponent {
  appName: string = 'real-estate-management';
  productName: string = 'Real Estate Management';
  chatbotQAArray: any = [];

  passDataFromQAFormToRealEstateManagement(_chatbotQAArray: any){
    this.chatbotQAArray = _chatbotQAArray;
  }
}
