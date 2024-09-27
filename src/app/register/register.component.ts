import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule,

  FormBuilder,
  FormControl, 
  FormGroup, 
  Validators,


} from '@angular/forms';
// import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule,NgIf],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  // list :Array<any> = [];

  
  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    this.registerForm = this.fb.group({
      company_name : ['', Validators.required],
      name: ['', Validators.required],
      address: ['', Validators.required],
      phone: ['', Validators.required],
      description: ['', Validators.required],

      image: ['', [Validators.required,]],

      email: ['', [Validators.required, Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)]],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
      ]],
      confirm_password: ['', [
        Validators.required,
        Validators.minLength(8),
      ]],

    });
  }
  
  
  onFileChange(event: any): void {
    const file = event.target.files[0];
    this.registerForm.patchValue({
      image: file
    });
  }

  submitted = false
  
  handleSubmit(){
    this.submitted = true;
    if (this.registerForm.valid) {
      const formData = new FormData();
      Object.keys(this.registerForm.value).forEach(key => {
        formData.append(key, this.registerForm.get(key)?.value);
      });

//       this.authService.register(formData).subscribe(
//         response => {
//           console.log('Registration successful:', response);
//           this.router.navigate(['/login']);
//         },
//         error => {
//           console.error('Registration failed:', error);
//         }
//       );
//     }
//   }
// }
    }}
}