import { Component, OnInit } from '@angular/core';
import { PropertyService } from '../../services/propertyService/property.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-view-property',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './view-property.component.html',
  styleUrls: ['./view-property.component.css']
})
export class ViewPropertyComponent implements OnInit {
  propertyId: string = '';
  propertyDetails: any = {};

  startDate: string = '';
  endDate: string = '';
  city: string = '';
  sleeps: number = 0;

  totalPrice: number = 0; 

  constructor(private propertyService: PropertyService, private route: ActivatedRoute , private router: Router) { }

  ngOnInit(): void {
    this.propertyId = this.route.snapshot.paramMap.get('id') || '';

    // Capture query parameters
    this.route.queryParams.subscribe(params => {
      this.startDate = params['start_date'] || '';
      this.endDate = params['end_date'] || '';
      this.city = params['city'] || '';
      this.sleeps = +params['sleeps'] || 0; 

      console.log("Start Date:", this.startDate);
      console.log("End Date:", this.endDate);
      console.log("City:", this.city);
      console.log("Sleeps:", this.sleeps);
      
      this.propertyService.viewProperty(Number(this.propertyId)).subscribe((res: any) => {
        this.propertyDetails = res.data;
        console.log("Property Details:", this.propertyDetails);

        this.calculateTotalPrice();
      });
    });
  }

  calculateTotalPrice() {
    const start = new Date(this.startDate);
    const end = new Date(this.endDate);
    
    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      console.error("Invalid dates");
      this.totalPrice = 0;
      return;
    }

    const timeDifference = end.getTime() - start.getTime(); 
    const numberOfDays = timeDifference / (1000 * 3600 * 24); 
    if (numberOfDays > 0 && this.propertyDetails.nightRate) {
      this.totalPrice = numberOfDays * this.propertyDetails.nightRate;
    } else {
      this.totalPrice = 0; 
    }

  }

  navigateToPayment() {
    this.router.navigate(['/payment'], {
      queryParams: {
        product_name: this.propertyDetails.name,
        sleeps: this.sleeps,
        total_price: this.totalPrice // Pass the total price as well
      }
    });
  }
}
