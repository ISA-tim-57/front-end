import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Student1Service } from '../student1.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '../model/user.model';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [CommonModule,MatInputModule, MatFormFieldModule,ReactiveFormsModule],
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent {

  constructor(private service : Student1Service) {}

 
  passwordsNotMatching = false;

    userForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
    passwordConfirmation: new FormControl('', Validators.required), // Add password confirmation field
    username: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
    surname: new FormControl('', Validators.required),
    phone: new FormControl('', Validators.required),
    profession: new FormControl(''),
    companyInfo: new FormControl(''),
    country: new FormControl('', Validators.required),
    city: new FormControl('', Validators.required),
    street: new FormControl('', Validators.required),
    number: new FormControl('', Validators.required),
    zipCode: new FormControl('', Validators.required)
  });
  

  validatePassword(): void {
    const password = this.userForm.get('password')?.value;
    const confirmPassword = this.userForm.get('passwordConfirmation')?.value;
  
    this.passwordsNotMatching = password !== confirmPassword;
  
    if (this.passwordsNotMatching) {
      this.userForm.get('passwordConfirmation')?.setErrors({ notMatching: true });
    } else {
      this.userForm.get('passwordConfirmation')?.setErrors(null);
    }
  }

  async addUser(): Promise<void> {
    console.log(this.userForm.value);

    if (this.userForm.valid) {
      const user: User = {
        id: 0,
        email: this.userForm.value.email || '', // Postavljanje početne vrednosti na prazan string
        password: this.userForm.value.password || '', // Postavljanje početne vrednosti na prazan string
        username: this.userForm.value.username || '', // Postavljanje početne vrednosti na prazan string
        name: this.userForm.value.name || '', // Postavljanje početne vrednosti na prazan string
        surname: this.userForm.value.surname || '', // Postavljanje početne vrednosti na prazan string
        address: {
          id: 0,
          country: this.userForm.value.country || '', // Postavljanje početne vrednosti na prazan string
          city: this.userForm.value.city || '', // Postavljanje početne vrednosti na prazan string
          street: this.userForm.value.street || '', // Postavljanje početne vrednosti na prazan string
          number: this.userForm.value.number || '', // Postavljanje početne vrednosti na prazan string
          zipCode: this.userForm.value.zipCode || '' // Postavljanje početne vrednosti na prazan string
        },
        phone: this.userForm.value.phone || '', // Postavljanje početne vrednosti na prazan string
        profession: this.userForm.value.profession || '', // Postavljanje početne vrednosti na prazan string
        companyInfo: this.userForm.value.companyInfo || '' // Postavljanje početne vrednosti na prazan string
      };

      this.service.addUser(user).subscribe({
        next: (_: any) => {
          console.log("Uspesno");
        }
      });
    }
  }
}
