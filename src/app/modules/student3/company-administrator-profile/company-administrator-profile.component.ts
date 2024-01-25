import { Component } from '@angular/core';
import { Student3Service } from '../student3.service';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpResponse } from '@angular/common/http';
import { AuthService } from 'src/app/auth/auth.service';
import { Router } from '@angular/router';
import { Company, createEmptyCompany } from 'src/app/model/company.model';
import { Appointment, createEmptyAppointment } from 'src/app/model/appointment.model';
import { CompanyAdmin, createEmptyCompanyAdmin } from 'src/app/model/company-admin.model';
import { User, createEmptyUser } from 'src/app/model/user.model';
import { Address } from 'src/app/model/address.model';


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
  companyAdmins : CompanyAdmin[] = [];

  user : User = createEmptyUser();
  admin : CompanyAdmin = createEmptyCompanyAdmin();
  

  isFormeditable : boolean = false;
  isAdminFormEditable : boolean = false;
  isChangePasswordVisible : boolean = false;

  passwordError : boolean = false;
  companyId : number = 0;

  companySelected : boolean = false;
  adminSelected : boolean = true;


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


  adminForm = new FormGroup({
    name : new FormControl('',[Validators.required]),
    surname : new FormControl('',[Validators.required]),
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
      this.user = user;
      
      this.loadAdmin();

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

    updatedCompany.workingHoursStart = this.company.workingHoursStart;
    updatedCompany.workingHoursEnd = this.company.workingHoursEnd;


    this.service.updateCompany(this.company.id,updatedCompany).subscribe({
      next: () =>{
        this.loadCompany();
      }
    })
  }



  loadAdmin(){
    this.service.getCompanyAdmin(this.user.id).subscribe({
      next : (result : CompanyAdmin) =>{
        this.admin = result;
        this.companyId = result.companyId;
        this.adminForm = new FormGroup({
          name : new FormControl(result.name,[Validators.required]),
          surname : new FormControl(result.surname,[Validators.required]),
        });

        this.loadCompany();

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
        this.loadCompanyAdmins();
        
      }
    })
  }

  loadCompanyAdmins(){
    this.service.getCompanyAdmins(this.company.id).subscribe({
      next : (result) => {
        this.companyAdmins = result;
      }
    })
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

    let tempUser : User = {
      id : this.user.id,
      email : this.user.email,
      username : this.user.username,
      password : this.user.password,
      role : this.user.role,
    }

    let updatedCompanyAdmin : CompanyAdmin = {
      user : tempUser,
      name : this.adminForm.value.name || this.admin.name,
      surname : this.adminForm.value.surname || this.admin.surname,
      companyId : this.admin.companyId
    }

    this.service.updateCompanyAdmin(this.user.id,updatedCompanyAdmin).subscribe({
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

    this.service.changePassword(this.user.id,this.changePasswordForm.value.oldPassword || "",this.changePasswordForm.value.newPassword || "").subscribe({
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


  private cleanChangePassword() : void{
    this.changePasswordForm = new FormGroup({
      oldPassword : new FormControl('', [Validators.required]),
      newPassword : new FormControl('', [Validators.required]),
      confirmPassword : new FormControl('', [Validators.required])
    });
  }

}
