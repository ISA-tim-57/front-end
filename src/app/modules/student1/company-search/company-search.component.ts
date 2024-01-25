import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Student1Service } from '../student1.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Company } from 'src/app/model/company.model';

@Component({
  selector: 'app-company-search',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,FormsModule],
  templateUrl: './company-search.component.html',
  styleUrls: ['./company-search.component.css']
})
export class CompanySearchComponent implements OnInit {

  allCompanies: Company[] = []; // Dodana varijabla za pohranu svih kompanija
  companies: Company[] = [];
  searchName: string = '';
  searchCity: string = '';

  constructor(private service: Student1Service) {}

  ngOnInit(): void {
    this.getCompanies(); // Pozivamo getCompanies prilikom inicijalizacije komponente
  }

  getCompanies(): void {
    this.service.getCompanies().subscribe({
      next: (result: Company[]) => {
        console.log(result);
        this.allCompanies = result; // Pohranjujemo sve kompanije
        this.companies = result; // Pri prvom dohvaćanju prikazujemo sve kompanije
      },
      error: (err: any) => {
        console.log(err);
      }
    });
  }

  searchCompanies(): void {
    // Provjera ako su oba polja prazna, prikazi sve kompanije
    if (this.searchName === '' && this.searchCity === '') {
      this.companies = this.allCompanies;
      return;
    }

    // Filtriranje po imenu i gradu ako su polja popunjena
    this.companies = this.allCompanies.filter((company: Company) => {
      // Filtriranje po imenu i gradu
      return (
        company.name.toLowerCase().includes(this.searchName.toLowerCase()) &&
        company.address.city.toLowerCase().includes(this.searchCity.toLowerCase())
      );
    });
  }
}
