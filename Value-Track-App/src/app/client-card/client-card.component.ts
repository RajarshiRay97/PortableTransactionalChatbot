import { Component, Input } from '@angular/core';
import { faMagnifyingGlass, faGear, faUsers, faFileLines, faListOl, faCircleDollarToSlot } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-client-card',
  templateUrl: './client-card.component.html',
  styleUrls: ['./client-card.component.css']
})
export class ClientCardComponent {
  // icons
  faMagnifyingGlass = faMagnifyingGlass;
  faGear = faGear;
  faUsers = faUsers;
  faFileLines = faFileLines;
  faListOl = faListOl;
  faCircleDollarToSlot =faCircleDollarToSlot;

  @Input() clientName: string = '';
}
