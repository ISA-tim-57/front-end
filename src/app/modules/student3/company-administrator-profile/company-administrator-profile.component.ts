import { Component } from '@angular/core';
import { Student3Service } from '../student3.service';
import { Company, createEmptyCompany } from '../model/company.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Address } from '../model/address.model';
import { Appointment, createEmptyAppointment } from '../model/appointment.model';
import { User, createEmptyUser } from '../model/user.model';

@Component({
  selector: 'app-company-administrator-profile',
  templateUrl: './company-administrator-profile.component.html',
  styleUrls: ['./company-administrator-profile.component.css']
})
export class CompanyAdministratorProfileComponent {

  constructor(private service : Student3Service){}

  company : Company = createEmptyCompany();
  appointments : Appointment[] = [];

  admin : User = createEmptyUser();

  isFormeditable : boolean = false;
  isAdminFormEditable : boolean = false;
  companyId : number = 1;

  companySelected : boolean = false;
  adminSelected : boolean = true;

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

  ngOnInit() : void{
    this.loadAdmin();
    this.loadCompany();
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

    this.service.addAppointmentToCompany(appointment).subscribe({
      next : ()=>{
        this.loadAppointments();
        this.appointmentForm = new FormGroup({
          selectedDate: new FormControl('',[Validators.required]),
          selectedTime: new FormControl('',[Validators.required]),
          duration : new FormControl(0,[Validators.required])
        })
      }
    })
  }

  loadAdmin(){
    this.service.getUser(1).subscribe({
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
    this.companySelected = false;
    this.adminSelected = true;
  }

  selectCompany(){
    this.adminSelected = false;
    this.companySelected = true;
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
      address : updatedAddress
    }

    this.service.updateCompanyAdmin(this.admin.id,updatedCompanyAdmin).subscribe({
      next : () =>{
        this.loadAdmin();
      }
    })
  }

}
