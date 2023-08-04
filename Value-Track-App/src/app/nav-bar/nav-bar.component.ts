import { Component } from '@angular/core';
import { faUser, faDatabase, faShield, faListOl, faUsers, faGear, faAddressCard, faFileLines } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {
  // icons
  faUser = faUser;
  faDatabase = faDatabase;
  faShield = faShield;
  faListOl = faListOl;
  faUsers = faUsers;
  faGear = faGear;
  faAddressCard = faAddressCard;
  faFileLines = faFileLines;
}
