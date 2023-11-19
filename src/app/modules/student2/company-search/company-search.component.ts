import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Student3Service } from '../../student3/student3.service';
import { Company, createEmptyCompany } from '../../student3/model/company.model';
import { Student2Service } from '../student2.service';
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
