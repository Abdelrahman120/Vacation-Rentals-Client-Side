import { DatePipe, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { AdminServices } from '../services/admin-services.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-send-email',
  standalone: true,
  imports: [DatePipe, NgIf, NgFor, FormsModule],
  templateUrl: './send-email.component.html',
  styleUrl: './send-email.component.css',
})
export class SendEmailComponent {
  mailGreeting: string = '';
  mailBody: string = '';
  mailActionText: string = '';
  mailActionUrl: string = '';
  mailEndLine: string = '';
  owner_name: string = '';
  owner_id: string = '';
  constructor(
    private AdminService: AdminServices,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    const owner_id = this.route.snapshot.paramMap.get('id');
    this.owner_id = owner_id || '';
    this.AdminService.showOwner(Number(owner_id)).subscribe((data) => {
      this.owner_name = data.owner.name;
      this.mailGreeting = `Dear ${this.owner_name},`;
    });
    this.mailBody =
      "Hope this email finds you well.\nWe're reaching out to inform you that your property has been accepted.";
    this.mailActionText = 'Visit Our Website';
    this.mailActionUrl = 'http://localhost:4200/properties';
    this.mailEndLine = 'Sincerely, VacationRentals';
  }

  sendMail(form: NgForm): void {
    if (form.valid && this.owner_id) {
      const formData = new FormData();
      formData.append('mail_greeting', this.mailGreeting);
      formData.append('mail_body', this.mailBody);
      formData.append('mail_action_text', this.mailActionText);
      formData.append('mail_action_url', this.mailActionUrl);
      formData.append('mail_end_line', this.mailEndLine);

      this.AdminService.sendEmail(Number(this.owner_id), formData).subscribe({
        next: (response) => {
          console.log('Mail sent successfully:', response);
          this.router.navigate(['/admin/properties']); // Navigate after success
        },
        error: (error) => {
          console.error('Error sending mail:', error);
        },
      });
    } else {
      console.log('Form is invalid or ownerId is missing');
    }
  }
}
