import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
// import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  // credentials = { email: '', password: '' };

  // constructor(private authService: AuthService, private router: Router) {}

  submitted = false;
  user: any;
 
  handleSubmit(form:NgForm){
    this.submitted = true;
      console.log(form.value);
      
    
  //   this.authService.login(form.value).subscribe(
  //     (response) => {
  //       console.log('Login successful', response);
  //       this.router.navigate(['/profile']);
  //     },
  //     (error) => {
  //       console.error('Login failed', error);
  //     }
  //   );
  // }

  }
}
