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
export class EquipmentSearchComponent implements OnInit {allEquipment: Equipment[] = []; // All equipment
  equipments: Equipment[] = []; // Displayed equipment
  searchName: string = '';
 

  constructor(private service: Student1Service) {}

  ngOnInit(): void {
    this.getEquipments();
  }

  getEquipments(): void {
    this.service.getEquipments().subscribe({
      next: (result: Equipment[]) => {
        console.log(result);
        this.allEquipment = result;
        this.equipments = result;
      },
      error: (err: any) => {
        console.log(err);
      }
    });
  }

  searchEquipment(): void {
    if (this.searchName === '') {
      this.equipments = this.allEquipment;
      return;
    }

    this.equipments = this.allEquipment.filter((equipment: Equipment) =>
      equipment.name.toLowerCase().includes(this.searchName.toLowerCase())
    );
  }
}
