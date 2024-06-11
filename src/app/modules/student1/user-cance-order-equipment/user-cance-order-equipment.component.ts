import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderEquipment } from 'src/app/model/order-equipment';
import { Student1Service } from '../student1.service';

@Component({
  selector: 'app-user-cance-order-equipment',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-cance-order-equipment.component.html',
  styleUrl: './user-cance-order-equipment.component.css'
})
export class UserCanceOrderEquipmentComponent {
  orderEquipments: OrderEquipment[] = [];

  constructor(private student1Service: Student1Service) { }

  ngOnInit(): void {
    const userId = 1; // Replace with the actual user ID
    this.student1Service.getEquipmentOrderByUserId(userId).subscribe(
      (data: OrderEquipment[]) => {
        this.orderEquipments = data;
      },
      (error) => {
        console.error('Error fetching equipment orders', error);
      }
    );
  }
}
