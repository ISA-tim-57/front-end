import { Component, OnInit } from '@angular/core';
import { Student2Service } from '../../student2.service';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { User, createEmptyUser } from 'src/app/model/user.model';
import { BasicUser, createEmptyBasicUser } from 'src/app/model/basic-user.model';
import { AuthService } from 'src/app/auth/auth.service';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit{

  constructor(
    private service: Student2Service,
    private authService : AuthService,
    ){}

  user: User = createEmptyUser();  //promenljiva koaj sadrzi email,password,username, i sve ostalo sto ima svaki user
  basicUser : BasicUser = createEmptyBasicUser(); //promenljiva koja sadrzi id user-a i dodatna polaj koja ima samo obicni korisnik kao sto su name,surname,address...
  userId : number = 0;

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
    let tempuser = this.authService.getUser();
    if(tempuser !== null){
      this.user = tempuser;
      this.userId = this.user.id;
      this.loadBasicUser(this.user.id);

    }
  }

  loadBasicUser(id : number){
    this.service.getBasicUser(id).subscribe({
      next : (result) => {
        this.basicUser = result;
      }
    })
  }
  

}


