import { Component } from '@angular/core';
import { OwnerAuthService } from '../Services/owner-auth.service';
import { Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-forget-password',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.css'
})
export class ForgetPasswordComponent {
  constructor(private authService: OwnerAuthService, private router: Router) {}

  submitted = false;
  user: any;
 
  handleSubmit(form:NgForm){

    this.submitted = true;
      console.log(form.value);
      alert("Check your email for reset password link");

    
        return this.authService.forgetPassword(form.value.email).subscribe((data) => {
          console.log(data);
        });  

  }


  }

