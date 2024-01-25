import { Component, OnInit } from '@angular/core';
import { Student3Service } from '../student3.service';
import { Company, createEmptyCompany } from 'src/app/model/company.model';
import { Equipment } from 'src/app/model/equipment.model';
import { Appointment } from 'src/app/model/appointment.model';


@Component({
  selector: 'app-company-profile',
  templateUrl: './company-profile.component.html',
  styleUrls: ['./company-profile.component.css']
})
export class CompanyProfileComponent implements OnInit{

  constructor(private service : Student3Service){}

  company : Company = createEmptyCompany();

  equipments : Equipment[] = [];
  appointments : Appointment[] = [];

  showEquipment : boolean = false;
  showAppointment : boolean = false;

  companyId : number = 1;

  

  ngOnInit() : void{
    this.service.getCompany(this.companyId).subscribe({
      next: (result) =>{
        this.company = result;
      }
    })

  }

  equipmentsClick(){
    this.showAppointment = false;
    this.showEquipment = true;  

  }

  appointmentsClick(){
    this.showEquipment = false;
    this.showAppointment = true;

  }

}
