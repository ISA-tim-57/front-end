import { Component } from '@angular/core';
import { Student3Service } from '../student3.service';
import { Company, createEmptyCompany } from '../model/company.model';
import { Appointment, createEmptyAppointment } from '../model/appointment.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';
import { Router } from '@angular/router';
import { User, createEmptyUser } from '../model/user.model';

@Component({
  selector: 'app-create-appointment',
  templateUrl: './create-appointment.component.html',
  styleUrl: './create-appointment.component.css'
})
export class CreateAppointmentComponent {

  constructor(
    private service : Student3Service,
    private authService : AuthService,
    private router : Router,
  ){}

  company : Company = createEmptyCompany();
  appointments : Appointment[] = [];
  companyId : number = 0;
  user : User = createEmptyUser();

  appointmentForm = new FormGroup({
    selectedDate: new FormControl('',[Validators.required]),
    selectedTime: new FormControl('',[Validators.required]),
    duration : new FormControl(0,[Validators.required])
  })

  isAppointmentCreateErrorVisible : boolean = false;

  ngOnInit(){
    let tempuser = this.authService.getUser();
    if(tempuser !== null){
      this.user = tempuser;
      this.companyId = tempuser.companyId;
      this.loadAppointments();
      this.loadCompany();

    }
    else{
      this.router.navigate(['error'])
    }
  }

  transformToDate(dateTime : Date) : string{
    let date = new Date(dateTime)
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();

    return `${day < 10 ? '0' + day : day}.${month < 10 ? '0' + month : month}.${year}`;
  }

  transformToTime(dateTime : Date) : string{
    let date = new Date(dateTime)
    var hours = date.getHours();
    var minutes = date.getMinutes();
    
    return `${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}`;
  }

  loadAppointments(){
    this.service.getAppointmentsForCompany(this.user.companyId).subscribe({
      next : (result) => {
        this.appointments = result;
      }
    })
  }

  addAppointmentClick(){
    let appointment : Appointment = createEmptyAppointment();

    appointment.companyId = this.company.id;
    appointment.administratorName = "Pera";
    appointment.administratorSurname = "Peric";
    appointment.duration = this.appointmentForm.value.duration || 0;
    appointment.free = true;
    appointment.dateAndTime = new Date(`${this.appointmentForm.value.selectedDate}T${this.appointmentForm.value.selectedTime}`);

    let workingHoursStart = new Date(`1970-01-01T${this.company.workingHoursStart}`);
    let workingHoursEnd = new Date(`1970-01-01T${this.company.workingHoursEnd}`);

    if(this.validateAppointment(workingHoursStart,workingHoursEnd,appointment)){
      this.isAppointmentCreateErrorVisible = false;
      this.service.addAppointmentToCompany(appointment).subscribe({
        next : ()=>{
          this.loadAppointments();
          this.cleanAppointmentForm();
        }
      })
    }
    else{
      this.createAppointmentError();
    }
  }

  private createAppointmentError() : void{
    this.isAppointmentCreateErrorVisible = true;
  }

  private cleanAppointmentForm() : void{
    this.appointmentForm = new FormGroup({
      selectedDate: new FormControl('',[Validators.required]),
      selectedTime: new FormControl('',[Validators.required]),
      duration : new FormControl(0,[Validators.required])
    })
  }

  private validateAppointment(workingHoursStart : Date, workingHoursEnd : Date, appointment : Appointment) : boolean{

    const hoursStart = workingHoursStart.getHours();
    const minutesStart = workingHoursStart.getMinutes();

    const hoursEnd = workingHoursEnd.getHours();
    const minutesEnd = workingHoursEnd.getMinutes();

    const hoursAppointment = appointment.dateAndTime.getHours();
    const minutesAppointment = appointment.dateAndTime.getMinutes();

    if(hoursAppointment > hoursStart || (hoursAppointment === hoursStart && minutesAppointment >= minutesStart)){
      if(minutesAppointment + appointment.duration > 60){
        let newAppointmentHours = hoursAppointment + Math.floor((minutesAppointment + appointment.duration)/60)
        let newAppointmentMinutes = (minutesAppointment + appointment.duration) % 60
        if(newAppointmentHours < hoursEnd || (newAppointmentHours === hoursEnd && newAppointmentMinutes < minutesEnd)){
          return true;
        }
        else{
          return false;
        }
      }
      else{
        if(hoursAppointment < hoursEnd || (hoursAppointment === hoursEnd && minutesAppointment < minutesEnd)){
          return true;
        }
        else{
          return false;
        }
      }
    }
    else{
      return false;
    }
  }

  getCurrentDate() : string{
    const today = new Date();
    const todayDay = today.getDate();
    const todayMonth = today.getMonth() + 1;
    const todayYear = today.getFullYear();
    const date = todayYear + "-" + todayMonth + "-" + todayDay;
    return date;
  }

  loadCompany(){
    this.service.getCompany(this.companyId).subscribe({
      next: (result) =>{
        this.company = result;
      }
    })
  }

}
