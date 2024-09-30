import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { OwnerAuthService } from '../Services/owner-auth.service';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  credentials = { email: '', password: '' };

  constructor(private authService: OwnerAuthService, private router: Router) {}

  submitted = false;
  user: any;

  handleSubmit(form: NgForm) {
    this.submitted = true;
    console.log(form.value);

    this.authService.login(form.value).subscribe(
      (response: boolean) => {
        if (response) {
          this.router.navigate(['/properties']);
        }
      },
      (error) => {
        console.error('Login failed', error);
      }
    );
  }
}
