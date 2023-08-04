import { Component } from '@angular/core';
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pending-approval-list',
  templateUrl: './pending-approval-list.component.html',
  styleUrls: ['./pending-approval-list.component.css']
})
export class PendingApprovalListComponent {
  // icons
  faHouse = faHouse;

  initiatives: any[] = [
    {
      id: "ABT000218",
      name: "Dallas-FY18-Sourcing-M-BMS",
      initiativeStatus: "Pending"
    },
    {
      id: "ABT000024",
      name: "Casa Grande-FY17-M-Cintas Uniform Reduction",
      initiativeStatus: "Pending"
    },
    {
      id: "ABT000025",
      name: "Casa Grande-FY17-M-Dock & Door PMs & Repairs",
      initiativeStatus: "Pending"
    },
    {
      id: "ABT000184",
      name: "Fairfield - FY17 - M - CALIBRATION LEVEL LOAD",
      initiativeStatus: "Pending"
    },
    {
      id: "GEZ002368",
      name: "MEX Monterrey - GOC 1 - Cont - 54200 - Sec Guard Contract",
      initiativeStatus: "Pending"
    },
    {
      id: "GEZ002389",
      name: "MEX Monterrey - GOC 1 - Cont - 50200 Cleaning Contract",
      initiativeStatus: "Pending"
    },
    {
      id: "GEZ002531",
      name: "MX-SAMARA-CDMX- Cont-Other Expense - Transportation",
      initiativeStatus: "Pending"
    },
    {
      id: "AHOLD000024",
      name: "10406 Preventief Onderhoud Mall Leeuwarden",
      initiativeStatus: "Pending"
    },
    {
      id: "AHOLD000026",
      name: "10479 Preventief Onderhoud Mall Purmerend",
      initiativeStatus: "Pending"
    },
    {
      id: "AHOLD000029",
      name: "10572 Preventief Onderhoud Mall Tilburg",
      initiativeStatus: "Pending"
    }
  ];

  constructor(private router: Router){}

  // when we click on approve button
  onApproveClick(id: string){
    for (let item of this.initiatives){
      if (item.id === id){
        item.initiativeStatus = "Approved";
        break;
      }
    }
  }

  // when we click on reject button
  onRejectClick(id: string){
    for (let item of this.initiatives){
      if (item.id === id){
        item.initiativeStatus = "Rejected";
        break;
      }
    }
  }

  // to go to home page
  navigateToHome(){
    this.router.navigate(['/']);
  }
}
