import { Component } from '@angular/core';
import { Student3Service } from '../student3.service';
import { AuthService } from 'src/app/auth/auth.service';
import { User, createEmptyUser } from 'src/app/model/user.model';
import { CompanyAdmin, createEmptyCompanyAdmin } from 'src/app/model/company-admin.model';
import { Router } from '@angular/router';
import { BasicUser } from 'src/app/model/basic-user.model';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.css'
})
export class CustomersComponent {

  constructor(
    private service : Student3Service,
    private authService : AuthService,
    private router : Router,
  ){}

  user : User = createEmptyUser();
  admin : CompanyAdmin = createEmptyCompanyAdmin();
  companyId : number = 0;

  customers : BasicUser[] = [];

  ngOnInit(){
    let tempuser = this.authService.getUser();
    if(tempuser !== null){
      this.user = tempuser;
      this.service.getCompanyAdmin(this.user.id).subscribe({
        next : (result : CompanyAdmin) =>{
          this.admin = result;
          this.companyId = result.companyId;
          this.loadCustomers(result.companyId);
        }
      });
      

    }
    else{
      this.router.navigate(['error'])
    }
  }

  loadCustomers(companyId : number){
    this.service.getCustomers(companyId).subscribe({
      next : (result : BasicUser[]) =>{
        this.customers = result;
      }
    })

  }
}
