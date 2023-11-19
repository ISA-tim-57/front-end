import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserProfileComponent } from './user-profile/user-profile/user-profile.component';
import { CompanySearchComponent } from './company-search2/company-search.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    UserProfileComponent,
    CompanySearchComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    BrowserModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule
  ],
  exports : []
})
export class Student2Module { }
