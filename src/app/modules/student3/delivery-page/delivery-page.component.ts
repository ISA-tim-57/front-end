import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { CompanyAdmin, createEmptyCompanyAdmin } from 'src/app/model/company-admin.model';
import { PurchaseOrder } from 'src/app/model/purchase-order.model';
import { User, createEmptyUser } from 'src/app/model/user.model';
import { Student3Service } from '../student3.service';
import { Router } from '@angular/router';
import { EmailRequest } from 'src/app/model/email-request.model';

@Component({
  selector: 'app-delivery-page',
  templateUrl: './delivery-page.component.html',
  styleUrl: './delivery-page.component.css'
})
export class DeliveryPageComponent {

  constructor(
    private authService : AuthService,
    private service : Student3Service,
    private router : Router,
  ){}

  user : User = createEmptyUser();
  admin : CompanyAdmin = createEmptyCompanyAdmin();

  purchaseOrders : PurchaseOrder[] = [];



  ngOnInit(){
    let tempuser = this.authService.getUser();
    if(tempuser !== null){
      this.user = tempuser;
      this.service.getCompanyAdmin(this.user.id).subscribe({
        next : (result : CompanyAdmin) =>{
          this.admin = result;
          this.loadPurchaseOrders();
        }
      });
      

    }
    else{
      this.router.navigate(['error'])
    }
  }

  loadPurchaseOrders(){
    this.service.getPurchaseOrdersForCompanyAdmin(this.user.id).subscribe({
      next : (result) =>{
        this.purchaseOrders = result;
      }
    })
  }

  getAppointmentDate(dateAndTime : string) : string{
    let date = new Date(Date.parse(dateAndTime));
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    return `${day}.${month}.${year}.`;
  }

  getAppointmentTime(dateAndTime : string) : string{
    let date = new Date(Date.parse(dateAndTime));
    let hours = date.getHours();
    let minutes = date.getMinutes();

    if(minutes / 10 < 1 && hours / 10 < 1){
      return `0${hours}:0${minutes}`;
    }
    else if(minutes / 10 < 0){
      return `${hours}:0${minutes}`;
    }
    else if(hours / 10 < 0){
      return `0${hours}:${minutes}`;
    }
    else{
      return `${hours}:${minutes}`;
    }
    
  }

  completeOrder(purchaseOrder : PurchaseOrder){
    console.log(purchaseOrder);
    this.service.markOrderAsCompleted(purchaseOrder).subscribe({
      next : () =>{
        this.sendMail(purchaseOrder.customer.user.email,purchaseOrder.id);
      }
    })

  }

  sendMail(email : string, id : number){
    let request : EmailRequest = {
      to : 'lukarakin01@gmail.com', //email
      subject : 'Confirmation of taking over the equipment',
      body : `You have successfully picked up your order marked with id:${id} `,
    }
    this.service.sendMail(request).subscribe({
      next: (response) => {
          console.log('Email sent successfully');
          this.loadPurchaseOrders();
      },
      error: (error) => {
        console.error('Failed to send email');
      }
    })
  }

}
