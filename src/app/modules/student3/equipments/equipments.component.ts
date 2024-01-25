import { Component, Input } from '@angular/core';
import { Student2Service } from '../../student2/student2.service';
import { Student3Service } from '../student3.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Equipment, createEmptyEquipment } from 'src/app/model/equipment.model';

@Component({
  selector: 'app-equipments',
  templateUrl: './equipments.component.html',
  styleUrls: ['./equipments.component.css']
})
export class EquipmentsComponent {

  @Input() selectedCompanyId : number = 0;

  constructor(private service : Student3Service){}

  equipments : Equipment[] = [];

  ngOnInit(): void{
    this.loadEquipments();
  }

  loadEquipments(){
    this.service.getEquipmentsForCompany(this.selectedCompanyId).subscribe({
      next : (result) =>{
        this.equipments = result;
      }
    })
  }


  

}
