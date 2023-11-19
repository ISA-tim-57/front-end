import { Component, Input } from '@angular/core';
import { Student2Service } from '../../student2/student2.service';
import { Student3Service } from '../student3.service';
import { Equipment, createEmptyEquipment } from '../model/equipment.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-equipments',
  templateUrl: './equipments.component.html',
  styleUrls: ['./equipments.component.css']
})
export class EquipmentsComponent {

  @Input() selectedCompanyId : number = 0;

  constructor(private service : Student3Service){}

  equipments : Equipment[] = [];

  isFormEnabled : boolean = false;

  

  equipmentForm = new FormGroup({
    name: new FormControl('',[Validators.required]),
    description: new FormControl('', [Validators.required]),
    price: new FormControl(0),
  });

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

  addEquipment(){
    let newEquipment : Equipment = createEmptyEquipment();
    newEquipment.id = 0;
    newEquipment.companyId = this.selectedCompanyId;
    newEquipment.name = this.equipmentForm.value.name || "";
    newEquipment.description = this.equipmentForm.value.description || "";
    newEquipment.price = this.equipmentForm.value.price || 0;

    this.service.addEquipmentToCompany(newEquipment).subscribe({
      next: () =>{
        this.equipmentForm = new FormGroup({
          name: new FormControl('',[Validators.required]),
          description: new FormControl('', [Validators.required]),
          price: new FormControl(0),
        });
        this.isFormEnabled = false;
        this.loadEquipments();
      }
    });
  }

  newEquipmentClick(){
    this.isFormEnabled = true;
  }

  

}
