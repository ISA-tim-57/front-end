import { Component, OnInit } from '@angular/core';
import { Company, createEmptyCompany } from '../model/company.model';
import { Student3Service } from '../student3.service';
import { Equipment } from '../model/equipment.model';
import { Appointment } from '../model/appointment.model';


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

  

  ngOnInit() : void{
    this.service.getCompany(1).subscribe({
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
