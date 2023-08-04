import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

// Designed for value-track
export class MediatorService {

  clientsArr!: any;
  
  // to fetch access privileges
  ActivateFetchAccessPrivileges = (): string =>{
    let msgStr: string = 'Here is what I found out regarding the access privileges currently assigned to you.\n<ol>';
    this.clientsArr.forEach((client: any, index: number)=>{
      let currentStr = `<li>${client.name} - ${client.accessPrivilege}</li>`;
      msgStr = msgStr.concat(currentStr);
    });
    msgStr = msgStr+'</ol>'
    return msgStr;
  }

  // to fetch pending approvals
  FetchPendingApprovals = (): string =>{
    let msgStr = "Here you go. You can access all the details of your pending approvals by clicking the below link:\n";
    let link = `<span (click)="onLinkClick()" class="navigateLink">Pending Approvals' Details</span>`;
    return msgStr+link;
  }

  targetMethodObject: { [K: string]: Function } = {
    "fetch access privileges": this.ActivateFetchAccessPrivileges,
    "fetch pending approvals": this.FetchPendingApprovals
  }

  constructor() {
    
  }
  
  // to pass data from client list component to Mediator service
  passDatatoMediator(data: any) {
    this.clientsArr = data;
  }

  // to fetch client access request
  fetchClientAccess(client: string): string[]{
    let msgStr = "Oops! I couldn’t get the client name. Can you please try with another client name.";
    for (let item of this.clientsArr){
      if(client.toLowerCase() === item.name.toLowerCase()){
        msgStr = `Perfect! You can get in touch with any of the below administrators for requesting access of client '<b>${item.name}</b>'.\n<ul>`;
        for (let admin of item.administrators){
          msgStr = msgStr.concat(`<li>${admin.adminName} - <span class="help-line-color">${admin.emailId}</span></li>`);
        }
        msgStr = msgStr+`</ul>`;
        break;
      }
    }

    return [msgStr];
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
