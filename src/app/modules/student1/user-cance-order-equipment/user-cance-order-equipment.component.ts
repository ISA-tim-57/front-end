import { Component, OnInit } from '@angular/core';
import { Student1Service } from '../student1.service';
import { PurchaseOrder } from 'src/app/model/purchase-order.model';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from 'src/app/model/user.model';


@Component({
  selector: 'app-user-cance-order-equipment',
  templateUrl: './user-cance-order-equipment.component.html',
  styleUrls: ['./user-cance-order-equipment.component.css']
})
export class UserCanceOrderEquipmentComponent implements OnInit {
  purchaseOrders: PurchaseOrder[] = [];

  constructor(private student1Service: Student1Service, private authService: AuthService) { }

  ngOnInit(): void {
    const user: User = this.authService.getUser()!; 
    const userId = user.id;

    // Replace with the actual user ID
    this.student1Service.getPurchaseOrderByUserId(userId).subscribe(
      (data: PurchaseOrder[]) => {
        this.purchaseOrders = data;
        console.log(data);
      },
      (error) => {
        console.error('Error fetching equipment orders', error);
      }
    );
  }


  confirmCancel(order: PurchaseOrder): void {
    const user: User = this.authService.getUser()!;
    const userId = user.id;

    if (window.confirm('Do you want to cancel this order?')) {
      this.student1Service.cancelPurchaseOrderByUser(userId, order).subscribe(
        (response) => {
          console.log('Order cancelled successfully', response);
          this.purchaseOrders = this.purchaseOrders.filter(o => o.id !== order.id); // Remove cancelled order from list
        },
        (error) => {
          console.error('Error cancelling the order', error);
        }
      );
    }
  }

  
}
