import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Student2Service } from '../student2.service';
import { Company } from 'src/app/model/company.model';
@Component({
  selector: 'app-company-search',
  templateUrl: './company-search.component.html',
  styleUrls: ['./company-search.component.css']
})
export class CompanySearchComponent {

  constructor(private service: Student2Service){}

  companiesForm = new FormGroup({})

  companies: Company[] = [];
  filteredCompanies: Company[] = [];
  searchTerm: string = '';
  selectedRating: number = 0;
  
  ngOnInit(): void {
    this.service.getAllCompanies().subscribe({
      next: (result) => {
        this.companies = result;
        this.filteredCompanies = [...this.companies];
      }
    });
  }

  search(): void {
    this.filteredCompanies = this.companies.filter((company) =>
     (company.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
     company.address.city.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
     company.address.street.toLowerCase().includes(this.searchTerm.toLowerCase())) &&
     (!this.selectedRating || company.rating == this.selectedRating));
  }


}
