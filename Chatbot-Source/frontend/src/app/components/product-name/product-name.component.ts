import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-product-name',
  templateUrl: './product-name.component.html',
  styleUrls: ['./product-name.component.css']
})
export class ProductNameComponent {
  @Input() productNameHeader: string = '';
}
