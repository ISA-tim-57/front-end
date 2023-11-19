import { Component, OnInit } from '@angular/core';// Proverite putanju do vašeg Equipment modela
import { Student1Service } from '../student1.service';
import { Observable } from 'rxjs';
import { Equipment } from '../../student3/model/equipment.model';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-equipment-search',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,FormsModule],
  templateUrl: './equipment-search.component.html',
  styleUrls: ['./equipment-search.component.css']
})
export class EquipmentSearchComponent implements OnInit {

  allEquipment: Equipment[] = []; // Sva oprema
  equipments: Equipment[] = []; // Prikazana oprema
  searchName: string = '';

  constructor(private service: Student1Service) {}

  ngOnInit(): void {
    this.getEquipments(); // Dobavljanje opreme prilikom inicijalizacije komponente
  }

  getEquipments(): void {
    this.service.getEquipments().subscribe({
      next: (result: Equipment[]) => {
        console.log(result);
        this.allEquipment = result; // Pohranjivanje svih uređaja
        this.equipments = result; // Na početku prikaži sve uređaje
      },
      error: (err: any) => {
        console.log(err);
      }
    });
  }

  searchEquipment(): void {
    if (this.searchName === '') {
      this.equipments = this.allEquipment; // Ako je polje prazno, prikaži sve uređaje
      return;
    }

    this.equipments = this.allEquipment.filter((equipment: Equipment) =>
      equipment.name.toLowerCase().includes(this.searchName.toLowerCase())
    );
  }
}
