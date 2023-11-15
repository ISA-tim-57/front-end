import { Component } from '@angular/core';
import { Appointment } from '../model/appointment.model';
import { Student3Service } from '../student3.service';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.css']
})
export class AppointmentsComponent {

  constructor(private service : Student3Service){}

  appointments : Appointment[] = [];

  ngOnInit() : void{
    this.service.getAppointmentsForCompany(1).subscribe({
      next: (result) => {
        this.appointments = result;
      }
    })
  }

}
