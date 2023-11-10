import { Component } from '@angular/core';
import { Student3Service } from '../student3.service';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.css']
})
export class DemoComponent {

  constructor (private service : Student3Service) {}

  

  
}
