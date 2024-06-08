import { Component, OnInit } from '@angular/core';
import { Student1Service } from '../student1.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Equipment } from 'src/app/model/equipment.model';

@Component({
  selector: 'app-equipment-search',
  templateUrl: './equipment-search.component.html',
  styleUrls: ['./equipment-search.component.css']
})
export class EquipmentSearchComponent implements OnInit {

  allEquipment: Equipment[] = []; // All equipment
  equipments: Equipment[] = []; // Displayed equipment
  searchName: string = '';

  constructor(private service: Student1Service) {}

  ngOnInit(): void {
    this.getEquipments(); // Fetch equipment during component initialization
  }

  getEquipments(): void {
    this.service.getEquipments().subscribe({
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
