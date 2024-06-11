import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Appointment } from 'src/app/model/appointment.model';
import { Student1Service } from '../student1.service';
import { ActivatedRoute } from '@angular/router';
import { OrderEquipment, createEmptyOrderEquipment } from 'src/app/model/order-equipment';
import { Equipment } from 'src/app/model/equipment.model';
import { PurchaseOrder, createEmptyPurchaseOrder } from 'src/app/model/purchase-order.model';
import { BasicUser } from 'src/app/model/basic-user.model';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from 'src/app/model/user.model';


@Component({
  selector: 'app-user-appoinments-by-company-view',
  templateUrl: './user-appoinments-by-company-view.component.html',
  styleUrls: ['./user-appoinments-by-company-view.component.css']
})
export class UserAppoinmentsByCompanyViewComponent implements OnInit {
  appointments: Appointment[] = [];
  companyId: number = 1; // Example static company ID
  selectedQuantity: number = 1; 
  selectedEquipmentId: number = 0;
  selectedEquipments: { equipment: Equipment, quantity: number }[] = [];
  purchaseOrder: PurchaseOrder = createEmptyPurchaseOrder();
  constructor(private service: Student1Service, private route: ActivatedRoute,private authService:AuthService) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.companyId = +params['companyId'];
      this.getAppointmentsByCompany();
      this.selectedEquipments = history.state.selectedEquipments || [];
    });
  }

  getAppointmentsByCompany(): void {
    this.service.getAppointmentsByCompanyId(this.companyId).subscribe({
      next: (result: Appointment[]) => {
        console.log(result);
        this.appointments = result.filter(appointment => appointment.free); // Filter only free appointments
      },
      error: (err: any) => {
        console.log(err);
      }
    });
  }

  confirmOrder(appointment: Appointment): void {
    const confirmResult = window.confirm('Are you sure to confirm the order?');
    if (confirmResult) {
      this.onAppointmentClick(appointment);
    }
  }

  
  onAppointmentClick(appointment: Appointment): void {
    this.purchaseOrder.appointment = appointment;
    const user: User = this.authService.getUser()!; 

    const orderEquipments: OrderEquipment[] = this.selectedEquipments.map(({ equipment, quantity }) => {
      const orderEquipment: OrderEquipment = createEmptyOrderEquipment();
      orderEquipment.equipment = equipment;
      orderEquipment.quantity = quantity; // Set the appropriate quantity
      return orderEquipment;
    });

    this.purchaseOrder.orderEquipments = orderEquipments;
    this.purchaseOrder.status = "ON_HOLD";
    this.purchaseOrder.customer.user.id=user.id;// Ensure customer is set correctly
    this.purchaseOrder.companyAdmin.user.id=3;
    this.service.createPurchaseOrder(this.purchaseOrder).subscribe({
      next: (response: PurchaseOrder) => {
        console.log('Purchase order created successfully:', response);
      },
      error: (err: any) => {
        console.log('Error creating purchase order:', err);
      }
    });
}

 

}
