import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ForgetUserPasswordService } from '../services/forget-user-password.service';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-forget-password-user',
  standalone: true,
  imports: [FormsModule,NgIf],
  templateUrl: './forget-password-user.component.html',
  styleUrl: './forget-password-user.component.css'
})
export class ForgetPasswordUserComponent {
  constructor(private authService: ForgetUserPasswordService, private router: Router) {}

  submitted = false;
  user: any;
  errorMessage: string = '';

  handleSubmit(form:NgForm){

    this.submitted = true;
      console.log(form.value);

    
        return this.authService.forgetPassword(form.value.email).subscribe((data) => {
          console.log(data);
          this.errorMessage = data.message;

        },(error) => {
                }); 
 

  }


  }


