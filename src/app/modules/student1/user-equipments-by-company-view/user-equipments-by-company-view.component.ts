import { Component, OnInit } from '@angular/core';
import { Equipment } from 'src/app/model/equipment.model';
import { Student1Service } from '../student1.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-equipments-by-company-view',
  templateUrl: './user-equipments-by-company-view.component.html',
  styleUrls: ['./user-equipments-by-company-view.component.css']
})
export class UserEquipmentsByCompanyViewComponent implements OnInit {

  allEquipment: Equipment[] = [];
  equipments: Equipment[] = [];
  searchName: string = '';
  companyId: number = 0;  // Example company ID, this can be dynamic
  selectedEquipmentId: number = 0; // Added selected equipment ID
  selectedEquipments: { equipment: Equipment, quantity: number }[] = [];
  constructor(private service: Student1Service, private router: Router) {}

  ngOnInit(): void {
    // Fetch equipment by company ID during component initialization
    const companyId = +this.router.url.split('/')[2]; // Extract companyId from the URL
    if (!isNaN(companyId)) {
      this.companyId = companyId;
      this.getEquipmentsByCompany();
    }
  }

  onSelectEquipment(equipment: Equipment): void {
    // Check if the equipment is already selected
    const existingSelection = this.selectedEquipments.find(item => item.equipment.id === equipment.id);
    if (existingSelection) {
      // If already selected, increase the quantity
      existingSelection.quantity++;
    } else {
      // If not selected yet, add it to the selectedEquipments array with quantity 1
      this.selectedEquipments.push({ equipment, quantity: 1 });
    }
  }
  // Method to handle equipment selection
  proceedToAppointments(): void {
    this.router.navigate(['appointments', this.companyId], {
      state: { selectedEquipments: this.selectedEquipments }
    });
  }

  getEquipmentsByCompany(): void {
    this.service.getEquipmentsByCompanyId(this.companyId).subscribe({
      next: (result: Equipment[]) => {
        console.log(result);
        this.allEquipment = result; // Store all equipment
        this.equipments = result; // Initially display all equipment
      },
      error: (err: any) => {
        console.log(err);
      }
    });
  }

  searchEquipment(): void {
    if (this.searchName === '') {
      this.equipments = this.allEquipment; // If field is empty, display all equipment
      return;
    }

    this.equipments = this.allEquipment.filter((equipment: Equipment) =>
      equipment.name.toLowerCase().includes(this.searchName.toLowerCase())
    );
  }
}
