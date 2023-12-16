import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Student3Service } from '../student3.service';
import { Equipment, createEmptyEquipment } from '../model/equipment.model';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-company-equipments',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './company-equipments.component.html',
  styleUrl: './company-equipments.component.css'
})
export class CompanyEquipmentsComponent {

  @Input() selectedCompanyId : number = 0;

  constructor(private service : Student3Service){}

  equipments : Equipment[] = [];

  isFormEnabled : boolean = false;

  isUpdateEnabled : boolean = false;

  

  equipmentForm = new FormGroup({
    name: new FormControl('',[Validators.required]),
    description: new FormControl('', [Validators.required]),
    price: new FormControl(0,[Validators.required,Validators.min(0.01)]),
  });

  updateEquipmentForm : FormGroup = new FormGroup({
    id : new FormControl(0),
    newName : new FormControl('',[Validators.required]),
    newDescription: new FormControl('', [Validators.required]),
    newPrice: new FormControl(0,[Validators.required,Validators.min(0.01)]),
  });

  searchForm = new FormGroup({
    search : new FormControl('')
  });

  ngOnInit(): void{
    this.loadEquipments();

    this.searchForm.get('search')?.valueChanges.subscribe(() => this.search());
  }

  loadEquipments(){
    this.service.getEquipmentsForCompany(this.selectedCompanyId).subscribe({
      next : (result) =>{
        this.equipments = result;
      }
    })
  }

  search(){
    const temp : string = this.searchForm.get('search')?.value || "";
    if(temp !== ""){
      this.service.searchEquipment(temp).subscribe({
        next : (result) =>{
          this.equipments = result;
        }
      })
    }
    else{
      this.loadEquipments();
    }
    
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
        this.cleanCreateForm();
        this.isFormEnabled = false;
        this.loadEquipments();
      }
    });
  }

  newEquipmentClick(){
    this.isFormEnabled = true;
    this.isUpdateEnabled = false;
  }

  updateEquipment(equipment : Equipment){
    this.isFormEnabled = false;
    this.isUpdateEnabled = true;

    this.updateEquipmentForm = new FormGroup({
      id : new FormControl(equipment.id),
      newName : new FormControl(equipment.name,[Validators.required]),
      newDescription: new FormControl(equipment.description, [Validators.required]),
      newPrice: new FormControl(equipment.price,[Validators.min(0.01),Validators.required]),
    })
  }

  deleteEquipment(id : number){
    this.service.deleteEquipment(id).subscribe({
      next : () =>{
        this.loadEquipments();
      }
    })

  }

  saveEquipment(){

    let equipment : Equipment = createEmptyEquipment();
    equipment.id = this.updateEquipmentForm.value.id,
    equipment.name = this.updateEquipmentForm.value.newName;
    equipment.description = this.updateEquipmentForm.value.newDescription;
    equipment.price = this.updateEquipmentForm.value.newPrice

    this.service.updateEquipment(equipment.id,equipment).subscribe({
      next : () =>{
        this.cleanUpdateForm();
        this.loadEquipments();
        this.isUpdateEnabled = false;
      }
    })
  }

  dismiss(){
    this.isUpdateEnabled = false;
    this.cleanUpdateForm();
  }

  private cleanUpdateForm() : void{
    this.updateEquipmentForm= new FormGroup({
      id : new FormControl(0),
      newName : new FormControl('',[Validators.required]),
      newDescription: new FormControl('', [Validators.required]),
      newPrice: new FormControl(0, [Validators.required,Validators.min(0.01)]),
    });
  }

  private cleanCreateForm() : void{
    this.equipmentForm = new FormGroup({
      name: new FormControl('',[Validators.required]),
      description: new FormControl('', [Validators.required]),
      price: new FormControl(0,[Validators.required,Validators.min(0.01)]),
    });
  }

}
