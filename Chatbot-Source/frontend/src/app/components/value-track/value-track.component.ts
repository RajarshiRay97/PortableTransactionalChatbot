import { Component } from '@angular/core';

@Component({
  selector: 'app-value-track',
  templateUrl: './value-track.component.html',
  styleUrls: ['./value-track.component.css']
})
export class ValueTrackComponent {
  appName: string = 'value-track';
  productName: string = 'Value Track';
  chatbotQAArray: any = [];

  passDataFromQAFormToValueTrack(_chatbotQAArray: any){
    this.chatbotQAArray = _chatbotQAArray;
  }
}
