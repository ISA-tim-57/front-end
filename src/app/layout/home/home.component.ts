import { Component } from '@angular/core';
import { LayoutService } from '../layout.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor (private service : LayoutService) {};

  ngOnInit() : void {
    // this.service.getDemoResponse().subscribe({
    //   next: (response)=>{
    //     // console.log(response);
    //   }
    // })
  }

}
