import { Component } from '@angular/core';
import { Student3Service } from '../student3.service';
import { Company, createEmptyCompany } from '../model/company.model';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Address } from '../model/address.model';
import { Appointment, createEmptyAppointment } from '../model/appointment.model';
import { User, createEmptyUser } from '../model/user.model';
import { HttpResponse } from '@angular/common/http';
import { AuthService } from 'src/app/auth/auth.service';
import { Router } from '@angular/router';
import { CompanyAdmin } from '../model/company-admin.model';

@Component({
  selector: 'app-company-administrator-profile',
  templateUrl: './company-administrator-profile.component.html',
  styleUrls: ['./company-administrator-profile.component.css']
})
export class CompanyAdministratorProfileComponent {

  constructor(
    private service : Student3Service, 
    private authService : AuthService,
    private router : Router
    ){}

  company : Company = createEmptyCompany();
  appointments : Appointment[] = [];
  companyAdmins : CompanyAdmin[] = [];

  admin : User = createEmptyUser();

  isFormeditable : boolean = false;
  isAdminFormEditable : boolean = false;
  isChangePasswordVisible : boolean = false;

  passwordError : boolean = false;
  companyId : number = 0;

  companySelected : boolean = false;
  adminSelected : boolean = true;
  equipmentSelected : boolean = false;

  isAppointmentCreateErrorVisible : boolean = false;

  companyForm = new FormGroup({
    name: new FormControl(this.company.name,[Validators.required]),
    description: new FormControl(this.company.description, [Validators.required]),
    country: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    street: new FormControl('', [Validators.required]),
    number: new FormControl('', [Validators.required]),
    zipCode: new FormControl('', [Validators.required]),
  });

  appointmentForm = new FormGroup({
    selectedDate: new FormControl('',[Validators.required]),
    selectedTime: new FormControl('',[Validators.required]),
    duration : new FormControl(0,[Validators.required])
  })

  adminForm = new FormGroup({
    name : new FormControl('',[Validators.required]),
    surname : new FormControl('',[Validators.required]),
    phone : new FormControl('',[Validators.required]),
    country: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    street: new FormControl('', [Validators.required]),
    number: new FormControl('', [Validators.required]),
    zipCode: new FormControl('', [Validators.required]),
  });

  changePasswordForm = new FormGroup({
    oldPassword : new FormControl('', [Validators.required]),
    newPassword : new FormControl('', [Validators.required]),
    confirmPassword : new FormControl('', [Validators.required])
  });

  passwordMatchValidator(): boolean {
    if(this.changePasswordForm.value.newPassword !== "" && this.changePasswordForm.value.confirmPassword !== ""
       && this.changePasswordForm.value.newPassword === this.changePasswordForm.value.confirmPassword ){
        return true;
      }
      else{
        return false;
      }
  }

  validateChangePassword() : boolean{
    if(this.passwordMatchValidator() && !this.changePasswordForm.invalid){
      return true;
    }
    else{
      return false;
    }
  }

  ngOnInit() : void{
    let user = this.authService.getUser();
    if(user !== null){
      this.admin = user;
      this.companyId = user.companyId;
      this.loadAdmin();
      this.loadCompany();

      this.changePasswordForm.get('newPassword')?.valueChanges.subscribe(() => this.validateChangePassword());
      this.changePasswordForm.get('confirmPassword')?.valueChanges.subscribe(() => this.validateChangePassword());
    }
    else{
      this.router.navigate(['error'])
    }
    
  }

  


  editClick(){
    this.companyForm.enable();
    this.isFormeditable = true;
  }

  saveClick(){
    this.companyForm.disable();
    this.isFormeditable = false;

    let updatedAddress : Address = {} as Address;

    updatedAddress.id = this.company.address.id;
    updatedAddress.country = this.companyForm.value.country || this.company.address.country;
    updatedAddress.city = this.companyForm.value.city || this.company.address.city;
    updatedAddress.street = this.companyForm.value.street || this.company.address.street;
    updatedAddress.number = this.companyForm.value.number || this.company.address.number;
    updatedAddress.zipCode = this.companyForm.value.zipCode || this.company.address.zipCode;


    let updatedCompany : Company = createEmptyCompany();
    updatedCompany.id = this.company.id;
    updatedCompany.name = this.companyForm.value.name || this.company.name;
    updatedCompany.description = this.companyForm.value.description || this.company.description;
    updatedCompany.rating = this.company.rating;
    updatedCompany.address = updatedAddress;

    this.service.updateCompany(this.company.id,updatedCompany).subscribe({
      next: () =>{
        this.loadCompany();
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
          this.cleanAppointmentform();
        }
      })
    }
    else{
      this.createAppointmentError();
    }
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

  private createAppointmentError() : void{
    this.isAppointmentCreateErrorVisible = true;
  }

  loadAdmin(){
    this.service.getUser(this.admin.id).subscribe({
      next : (result) =>{
        this.admin = result;

        this.adminForm = new FormGroup({
          name : new FormControl(result.name,[Validators.required]),
          surname : new FormControl(result.surname,[Validators.required]),
          phone : new FormControl(result.phone,[Validators.required]),
          country: new FormControl(result.address.country, [Validators.required]),
          city: new FormControl(result.address.city, [Validators.required]),
          street: new FormControl(result.address.street, [Validators.required]),
          number: new FormControl(result.address.number, [Validators.required]),
          zipCode: new FormControl(result.address.zipCode, [Validators.required]),
        });

        this.adminForm.disable();
        
      }
    })
  }

  loadCompany(){
    this.service.getCompany(this.companyId).subscribe({
      next: (result) =>{
        this.company = result;
        this.companyForm = new FormGroup({
          name: new FormControl(this.company.name,[Validators.required]),
          description: new FormControl(this.company.description, [Validators.required]),
          country: new FormControl(this.company.address.country, [Validators.required]),
          city: new FormControl(this.company.address.city, [Validators.required]),
          street: new FormControl(this.company.address.street, [Validators.required]),
          number: new FormControl(this.company.address.number, [Validators.required]),
          zipCode: new FormControl(this.company.address.zipCode, [Validators.required]),
        })

        this.companyForm.disable();
        this.loadAppointments();
        this.loadCompanyAdmins();
        
      }
    })
  }

  loadAppointments(){
    this.service.getAppointmentsForCompany(this.company.id).subscribe({
      next : (result) => {
        this.appointments = result;
      }
    })
  }

  loadCompanyAdmins(){
    this.service.getCompanyAdmins(this.company.id).subscribe({
      next : (result) => {
        this.companyAdmins = result;
        console.log(result)
      }
    })
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

  selectAdmin(){
    this.equipmentSelected = false;
    this.companySelected = false;
    this.adminSelected = true;
  }

  selectCompany(){
    this.equipmentSelected = false;
    this.adminSelected = false;
    this.companySelected = true;
  }

  selectEquipment(){
    this.adminSelected = false;
    this.companySelected = false;
    this.equipmentSelected = true;
  }

  editAdmin(){
    this.isAdminFormEditable= true;
    this.adminForm.enable();

  }

  updateAdmin(){
    this.isAdminFormEditable = false;
    this.adminForm.disable();

    let updatedAddress : Address = {
      id : this.admin.address.id,
      country : this.adminForm.value.country || this.admin.address.country,
      city : this.adminForm.value.city || this.admin.address.city,
      street : this.adminForm.value.street || this.admin.address.street,
      number : this.adminForm.value.number || this.admin.address.number,
      zipCode : this.adminForm.value.zipCode || this.admin.address.zipCode
    };

    let updatedCompanyAdmin : User = {
      id : this.admin.id,
      name : this.adminForm.value.name || this.admin.name,
      surname : this.adminForm.value.surname || this.admin.surname,
      email : this.admin.email,
      phone : this.adminForm.value.phone || this.admin.phone,
      profession : this.admin.profession,
      username : this.admin.username,
      password : this.admin.password,
      companyInfo : this.admin.companyInfo,
      address : updatedAddress,
      role : this.admin.role,
      companyId : this.admin.companyId
    }

    this.service.updateCompanyAdmin(this.admin.id,updatedCompanyAdmin).subscribe({
      next : () =>{
        this.loadAdmin();
      }
    })
  }

  changePasswordClick(){
    this.isChangePasswordVisible = true;
  }

  dismissPasswordChange(){
    this.isChangePasswordVisible = false;
    this.passwordError = false;
    this.cleanChangePassword();
  }

  changePassword(){

    this.service.changePassword(this.admin.id,this.changePasswordForm.value.oldPassword || "",this.changePasswordForm.value.newPassword || "").subscribe({
      next : (res : number) =>{
        if(res === 0){
          this.passwordError = true;
        }
        else{
          this.passwordError = false;
          this.cleanChangePassword();
          this.isChangePasswordVisible = false;
        }
      }
    })
  }

  getCurrentDate() : string{
    const today = new Date();
    const todayDay = today.getDate();
    const todayMonth = today.getMonth() + 1;
    const todayYear = today.getFullYear();
    const date = todayYear + "-" + todayMonth + "-" + todayDay;
    return date;
  }

  private cleanAppointmentform() : void{
    this.appointmentForm = new FormGroup({
      selectedDate: new FormControl('',[Validators.required]),
      selectedTime: new FormControl('',[Validators.required]),
      duration : new FormControl(0,[Validators.required])
    })
  }

  private cleanChangePassword() : void{
    this.changePasswordForm = new FormGroup({
      oldPassword : new FormControl('', [Validators.required]),
      newPassword : new FormControl('', [Validators.required]),
      confirmPassword : new FormControl('', [Validators.required])
    });
  }

}
