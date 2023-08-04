import { Component } from '@angular/core';

@Component({
  selector: 'app-locator',
  templateUrl: './locator.component.html',
  styleUrls: ['./locator.component.css']
})
export class LocatorComponent {
  appName: string = 'locator';
  productName: string = 'Locator';
  chatbotQAArray: any = [];

  passDataFromQAFormToLocator(_chatbotQAArray: any){
    this.chatbotQAArray = _chatbotQAArray;
  }
}
