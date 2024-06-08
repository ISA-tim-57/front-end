import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Student1Service } from '../student1.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Company } from 'src/app/model/company.model';

@Component({
  selector: 'app-company-search',
  templateUrl: './company-search.component.html',
  styleUrls: ['./company-search.component.css']
})
export class CompanySearchComponent implements OnInit {

  allCompanies: Company[] = []; // Variable added to store all companies
  companies: Company[] = [];
  searchName: string = '';
  searchCity: string = '';

  constructor(private service: Student1Service) {}

  ngOnInit(): void {
    this.getCompanies(); // Call getCompanies during component initialization
  }

  getCompanies(): void {
    this.service.getCompanies().subscribe({
      next: (result: Company[]) => {
        console.log(result);
        this.allCompanies = result; // Store all companies
        this.companies = result; // Display all companies initially
      },
      error: (err: any) => {
        console.log(err);
      }
    });
  }

  searchCompanies(): void {
    // If both fields are empty, show all companies
    if (this.searchName === '' && this.searchCity === '') {
      this.companies = this.allCompanies;
      return;
    }

    // Filter by name and city if fields are filled
    this.companies = this.allCompanies.filter((company: Company) => {
      // Filter by name and city
      return (
        company.name.toLowerCase().includes(this.searchName.toLowerCase()) &&
        company.address.city.toLowerCase().includes(this.searchCity.toLowerCase())
      );
    });
  }
}
