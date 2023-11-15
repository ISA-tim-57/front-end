import { Component } from '@angular/core';
import { Student2Service } from '../../student2/student2.service';
import { Student3Service } from '../student3.service';
import { Equipment } from '../model/equipment.model';

@Component({
  selector: 'app-equipments',
  templateUrl: './equipments.component.html',
  styleUrls: ['./equipments.component.css']
})
export class EquipmentsComponent {

  constructor(private service : Student3Service){}

  equipments : Equipment[] = [];

  ngOnInit(): void{
    this.service.getEquipmentsForCompany(1).subscribe({
      next : (result) =>{
        this.equipments = result;
      }
    })
  }

}
