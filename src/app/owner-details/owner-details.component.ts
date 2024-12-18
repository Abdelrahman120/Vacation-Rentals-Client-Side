import { Component } from '@angular/core';
import { AdminServices } from '../services/admin-services.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TruncatePipe } from '../pipes/truncate.pipe';

@Component({
  selector: 'app-owner-details',
  standalone: true,
  imports: [CommonModule, TruncatePipe],
  templateUrl: './owner-details.component.html',
  styleUrl: './owner-details.component.css',
})
export class OwnerDetailsComponent {
  owner: any;
  loading = true;
  constructor(
    private adminServices: AdminServices,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const ownerId: any = this.route.snapshot.paramMap.get('id');
    this.adminServices.getOwnerDetails(ownerId).subscribe(
      (data) => {
        this.owner = data.owner;
        this.loading = false;
      },
      (error) => {
        console.error('Error fetching owner details:', error);
        this.loading = false;
      }
    );
  }
}
