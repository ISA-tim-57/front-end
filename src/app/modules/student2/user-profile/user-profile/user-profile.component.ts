import { Component, OnInit } from '@angular/core';
import { Student2Service } from '../../student2.service';
import { User, createEmptyUser } from '../../model/user-profile.model';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit{

  constructor(private service: Student2Service){}

  user: User = createEmptyUser();

  userId: number = 1;

  userForm = new FormGroup({
    usernameEdit: new FormControl('',[Validators.required]),
    nameEdit: new FormControl('', [Validators.required]),
    surnameEdit: new FormControl('', [Validators.required]),
    emailEdit: new FormControl('', [Validators.required]),
    phoneEdit: new FormControl('', [Validators.required]),
    professionEdit: new FormControl('', [Validators.required]),
    companyInfoEdit: new FormControl('', [Validators.required]),
  });


  ngOnInit(): void {
    this.service.getUser(this.userId).subscribe({
      next: (result) => {
        this.user = result;
        console.log(this.user);
      }
    })
  }

  

}


