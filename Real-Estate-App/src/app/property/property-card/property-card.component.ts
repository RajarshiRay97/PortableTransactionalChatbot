import { Component, OnInit, Input } from '@angular/core';
import { faPenToSquare, faAddressBook } from '@fortawesome/free-solid-svg-icons';
import { IPropertyBase } from 'src/app/models/ipropertybase';

@Component({
  selector: 'app-property-card',
  templateUrl: './property-card.component.html',
  styleUrls: ['./property-card.component.css']
})
export class PropertyCardComponent implements OnInit {
  // fa icons
  faPenToSquare = faPenToSquare;
  faAddressBook = faAddressBook;

  @Input() PropertyObj!: IPropertyBase;
  @Input() showIcons!: boolean;
  @Input() showPreview!: boolean;

  constructor() { }

  ngOnInit() {
  }

}
