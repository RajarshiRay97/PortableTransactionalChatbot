import { Component } from '@angular/core';
import { MediatorService } from '../services/mediator.service';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css']
})
export class ClientListComponent {
  defaultValue: string = "Create Client";
  clientsArr: any = [
    {
      name:'Abbott/MSD',
      accessPrivilege: 'Client Administrator',
      administrators: [
        {
          adminName: "Smith Williams",
          emailId: "smith.williams@abbott.com"
        },
        {
          adminName: "Garcia Johnson",
          emailId: "garcia.johnson@abbott.com"
        }
      ]
    },
    {
      name: 'Adient',
      accessPrivilege: 'Standard user',
      administrators: [
        {
          adminName: "Jones Brown",
          emailId: "jones.brown@adient.com"
        }
      ]
    },
    {
      name: 'ADT',
      accessPrivilege: 'Client User',
      administrators: [
        {
          adminName: "Davis Miller",
          emailId: "davis.miller@adt.com"
        },
        {
          adminName: "Lopez Rodriguez",
          emailId: "lopez.rodriguez@adt.com"
        },
        {
          adminName: "Garcia Martinez",
          emailId: "garcia.martinez@adt.com"
        },
      ]
    },
    {
      name: 'Ahold',
      accessPrivilege: 'Standard user',
      administrators: [
        {
          adminName: "Wilson Hernandez",
          emailId: "wilson.hernandez@ahold.com"
        }
      ]
    },
    {
      name: 'AIG (US)',
      accessPrivilege: 'Client User',
      administrators: [
        {
          adminName: "Davis Gonzales",
          emailId: "davis.gonzales@aig.com"
        },
        {
          adminName: "Thomas Wilson",
          emailId: "thomas.wilson@aig.com"
        }
      ]
    },
    {
      name: 'Allergan',
      accessPrivilege: 'Standard user',
      administrators: [
        {
          adminName: "Taylor Anderson",
          emailId: "taylor.anderson@allergan.com"
        },
        {
          adminName: "Jones Moore",
          emailId: "jones.moore@allergan.com"
        }
      ]
    },
    {
      name: 'AMEX',
      accessPrivilege: 'Client Administrator',
      administrators: [
        {
          adminName: "Martin Lee",
          emailId: "martin.lee@amex.com"
        }
      ]
    },
    {
      name: 'ANZ Bank',
      accessPrivilege: 'Standard user',
      administrators: [
        {
          adminName: "Perez Thompson",
          emailId: "perez.thompson@anz.com"
        },
        {
          adminName: "Harris White",
          emailId: "harris.white@anz.com"
        },
        {
          adminName: "Sanchez Clark",
          emailId: "sanchez.clark@anz.com"
        }
      ]
    },
    {
      name: 'Aon (EMEA)',
      accessPrivilege: 'Client User',
      administrators: [
        {
          adminName: "Robinson Lwis",
          emailId: "robinson.lwis@aon.com"
        }
      ]
    },
    {
      name: 'Applied Materials',
      accessPrivilege: 'Client User',
      administrators: [
        {
          adminName: "Allen Walker",
          emailId: "allen.walker@appliedmaterials.com"
        }
      ]
    },
    {
      name: 'Associated Bank (US)',
      accessPrivilege: 'Standard user',
      administrators: [
        {
          adminName: "Scott Hill",
          emailId: "scott.hill@associatedbank.com"
        },
        {
          adminName: "Nelson Green",
          emailId: "nelson.green@associatedbank.com"
        }
      ]
    }
  ];

  constructor(private mediatorService: MediatorService){
    this.mediatorService.passDatatoMediator(this.clientsArr);
  }
}
