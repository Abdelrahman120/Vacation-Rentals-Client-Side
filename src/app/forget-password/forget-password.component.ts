import { Component } from '@angular/core';
import { OwnerAuthService } from '../Services/owner-auth.service';
import { Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-forget-password',
  standalone: true,
  imports: [FormsModule,NgIf],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.css'
})
export class ForgetPasswordComponent {
  constructor(private authService: OwnerAuthService, private router: Router) {}

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
          // if (error.status === 400) {
          //   this.errorMessage = 'No user found with that email';
          //   console.log(this.errorMessage);
            
          // }       
            }); 
 

  }


  }

