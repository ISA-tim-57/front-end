import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Student3Service } from '../student3.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';
import { Equipment, createEmptyEquipment } from 'src/app/model/equipment.model';
import { User, createEmptyUser } from 'src/app/model/user.model';
import { CompanyAdmin, createEmptyCompanyAdmin } from 'src/app/model/company-admin.model';

@Component({
  selector: 'app-company-equipments',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './company-equipments.component.html',
  styleUrl: './company-equipments.component.css'
})


//Ova komponenta predstavlja prikaz opreme administratoru kompanije
//Ovde administrator moze da dodaje, menja i brise opremu kompanije

export class CompanyEquipmentsComponent {

  constructor(
    private service : Student3Service,
    private authService : AuthService,
    ){}

  selectedCompanyId : number = 0;

  user : User = createEmptyUser();
  admin : CompanyAdmin = createEmptyCompanyAdmin();

  equipments : Equipment[] = [];

  isFormEnabled : boolean = false;

  isUpdateEnabled : boolean = false;

  isDeleteErrorVisible : boolean = false;

  

  equipmentForm = new FormGroup({
    name: new FormControl('',[Validators.required]),
    description: new FormControl('', [Validators.required]),
    price: new FormControl(0,[Validators.required,Validators.min(0.01)]),
    count: new FormControl(0,[Validators.required,Validators.min(0.0)]),
  });

  updateEquipmentForm : FormGroup = new FormGroup({
    id : new FormControl(0),
    newName : new FormControl('',[Validators.required]),
    newDescription: new FormControl('', [Validators.required]),
    newPrice: new FormControl(0,[Validators.required,Validators.min(0.01)]),
    newCount: new FormControl(0,[Validators.required,Validators.min(0.0)]),
  });

  searchForm = new FormGroup({
    search : new FormControl('')
  });

  ngOnInit(): void{
    let tempuser = this.authService.getUser();
    if(tempuser !== null){
      this.user = tempuser;
      this.loadAdmin();
    }
    

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
      this.service.searchEquipment(temp,this.selectedCompanyId).subscribe({
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
    newEquipment.count = this.equipmentForm.value.count || 0;

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
      newCount: new FormControl(equipment.count,[Validators.min(0.0),Validators.required]),
    })
  }

  deleteEquipment(id : number){
    if(this.checkIfDeleteIsAllowed(id)){
      this.service.deleteEquipment(id).subscribe({
        next : (result : boolean) =>{
          if(result){
            this.loadEquipments();
            this.isDeleteErrorVisible = false;
          }
          else{
            this.isDeleteErrorVisible = true;
          }
          
        }
      })
    }
    else{
      alert("Equipment is part of some not completed order, you can't delete it")
    }
    

  }

  checkIfDeleteIsAllowed(id : number) : boolean{
    return true;
  }

  saveEquipment(){

    let equipment : Equipment = createEmptyEquipment();
    equipment.id = this.updateEquipmentForm.value.id,
    equipment.name = this.updateEquipmentForm.value.newName;
    equipment.description = this.updateEquipmentForm.value.newDescription;
    equipment.price = this.updateEquipmentForm.value.newPrice;
    equipment.count = this.updateEquipmentForm.value.newCount;

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
      count: new FormControl(0,[Validators.required,Validators.min(0.0)]),
    });
  }

  loadAdmin(){
    this.service.getCompanyAdmin(this.user.id).subscribe({
      next : (result : CompanyAdmin) =>{
        this.admin = result;
        this.selectedCompanyId = result.companyId;
        this.loadEquipments();       
      }
    })
  }

}
