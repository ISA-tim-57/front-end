import { Component } from '@angular/core';
import { Student3Service } from '../student3.service';
import { FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';
import { Router } from '@angular/router';
import { Company, createEmptyCompany } from 'src/app/model/company.model';
import { Appointment, createEmptyAppointment } from 'src/app/model/appointment.model';
import { CompanyAdmin, createEmptyCompanyAdmin } from 'src/app/model/company-admin.model';
import { User, createEmptyUser } from 'src/app/model/user.model';

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

  integerValidator: ValidatorFn = (control) => {
    if (control.value % 1 !== 0) {
      return { integer: true };
    }
    return null;
  };

  company : Company = createEmptyCompany();
  appointments : Appointment[] = [];
  companyId : number = 0;
  user : User = createEmptyUser();
  admin : CompanyAdmin = createEmptyCompanyAdmin();

  appointmentForm = new FormGroup({
    selectedDate: new FormControl('',[Validators.required]),
    selectedTime: new FormControl('',[Validators.required]),
    duration : new FormControl(0,[Validators.required,Validators.min(1.0),this.integerValidator])
  });

  

  isAppointmentCreateErrorVisible : boolean = false;
  isAdminBusyCreateErrorVisible : boolean = false;
  isAppointmentInPastErrorVisible : boolean = false;

  ngOnInit(){
    let tempuser = this.authService.getUser();
    if(tempuser !== null){
      this.user = tempuser;
      this.service.getCompanyAdmin(this.user.id).subscribe({
        next : (result : CompanyAdmin) =>{
          this.admin = result;
          this.companyId = result.companyId;
          this.loadAppointments();
          this.loadCompany();
        }
      });
      

    }
    else{
      this.router.navigate(['error'])
    }
  }

  transformToDate(dateTime : string) : string{
    let date = new Date(Date.parse(dateTime));
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();

    return `${day < 10 ? '0' + day : day}.${month < 10 ? '0' + month : month}.${year}`;
  }

  transformToTime(dateTime : string) : string{
    let date = new Date(Date.parse(dateTime));
    var hours = date.getHours();
    var minutes = date.getMinutes();
    
    return `${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}`;
  }

  loadAppointments(){
    this.service.getAppointmentsForCompany(this.companyId).subscribe({
      next : (result) => {
        this.appointments = result;
      }
    })
  }

  addAppointmentClick(){
    let appointment : Appointment = {
      id : 0,
      companyId : this.company.id,
      administratorName : this.admin.name,
      administratorSurname : this.admin.surname,
      adminUserId : this.user.id,
      duration : this.appointmentForm.value.duration || 0,
      free : true,
      dateAndTime : `${this.appointmentForm.value.selectedDate}T${this.appointmentForm.value.selectedTime}`,
    }

    let workingHoursStart = new Date(`1970-01-01T${this.company.workingHoursStart}`);
    let workingHoursEnd = new Date(`1970-01-01T${this.company.workingHoursEnd}`);

    if(this.checkIfAppointmentIsInFuture(appointment)){
      this.isAppointmentInPastErrorVisible = false;

      if(this.validateAppointment(workingHoursStart,workingHoursEnd,appointment)){
        this.isAppointmentCreateErrorVisible = false;

        this.service.checkIfAdminIsFree(appointment).subscribe({
          next : (result : boolean) =>{

            if(result){
              this.isAdminBusyCreateErrorVisible = false;
              this.service.addAppointmentToCompany(appointment).subscribe({
                next : ()=>{
                  this.loadAppointments();
                  this.cleanAppointmentForm();
                }
              })
            }else{this.createAdminIsBusyError();}
          }
        })
        
      }else{this.createAppointmentError();}

    }
    else{
      this.createAppointmentIsInPastError();
    }

    
  }

  private createAppointmentError() : void{
    this.isAppointmentCreateErrorVisible = true;
  }

  private createAdminIsBusyError() : void{
    this.isAdminBusyCreateErrorVisible = true;
  }

  private createAppointmentIsInPastError(){
    this.isAppointmentInPastErrorVisible = true;
  }

  private cleanAppointmentForm() : void{
    this.appointmentForm = new FormGroup({
      selectedDate: new FormControl('',[Validators.required]),
      selectedTime: new FormControl('',[Validators.required]),
      duration : new FormControl(0,[Validators.required])
    })
  }

  private validateAppointment(workingHoursStart : Date, workingHoursEnd : Date, appointment : Appointment) : boolean{

    let dateAndTime = new Date(Date.parse(appointment.dateAndTime));
    const hoursStart = workingHoursStart.getHours();
    const minutesStart = workingHoursStart.getMinutes();

    const hoursEnd = workingHoursEnd.getHours();
    const minutesEnd = workingHoursEnd.getMinutes();

    const hoursAppointment = dateAndTime.getHours();
    const minutesAppointment = dateAndTime.getMinutes();

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

  checkIfAppointmentIsInFuture(appointment : Appointment) : boolean{
    let currentDate = new Date();
    let targetDate = new Date(Date.parse(appointment.dateAndTime))
    if(currentDate < targetDate){
      if(currentDate.getTime() < targetDate.getTime()){
        return true;
      }
      else{return false;}
    }
    else{return false;}
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

  sortAppointmentsByDateTime = (appointments: Appointment[]): Appointment[] => {
      // Sorting appointments based on dateAndTime property
      appointments.sort((a, b) => {
          const dateA = new Date(a.dateAndTime);
          const dateB = new Date(b.dateAndTime);
          
          // Compare dates
          if (dateA < dateB) return -1;
          if (dateA > dateB) return 1;
          
          // If dates are equal, compare time
          return 0;
      });
      
      return appointments;
  };

}
