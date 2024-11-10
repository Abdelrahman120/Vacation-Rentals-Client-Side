import { Component } from '@angular/core';
import { HeroComponent } from "../hero/hero.component";
import { AboutComponent } from "../about/about.component";
import { FooterComponent } from "../footer/footer.component";
import { ListComponent } from "../list/list.component";
import { RecommendationComponent } from "../recommendation/recommendation.component";
import { RouterModule } from '@angular/router';
import { TestimonialService } from '../services/testimonial.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PropertyService } from '../services/propertyService/property.service';

@Component({
  selector: 'app-master',
  standalone: true,
  imports: [ CommonModule, FormsModule,RouterModule,HeroComponent, AboutComponent, FooterComponent, ListComponent, RecommendationComponent],
  templateUrl: './master.component.html',
  styleUrl: './master.component.css'
})
export class MasterComponent {

  formData = {
    'name': '',
    'email': '',
    'subject': '',
    'message': ''
  }
  testimonials: any[] = [];
  properties: any[] = [];
  pairedTestimonials :any[] = [];
  ngOnInit(): void {
    this.getAllTestimonials();
  }

  constructor (private testmonialService: TestimonialService , private propertyService: PropertyService) {}

  onSubmit(testimonialForm: any) {
    if (testimonialForm.valid) {  // Ensure the form is valid before submitting
      this.testmonialService.sendTestimonial(this.formData).subscribe(
        response => {
          console.log('Message sent successfully', response);
        },
        error => {
          console.error('Error sending message', error);
        }
      );
    }
}

getAllTestimonials() {
  this.testmonialService.getAllTestimonials().subscribe(
    (data) => {
      this.testimonials = data.data;
      this.pairedTestimonials = this.groupTestimonials(this.testimonials);
      console.log(this.pairedTestimonials); // Check the grouped testimonials in the console
    },
    (error) => {
      console.log(error);
    }
  );
}

// Group testimonials into pairs for display
groupTestimonials(  testimonials: any) {
  const pairs = [];
  for (let i = 0; i < testimonials.length; i += 2) {
    pairs.push(testimonials.slice(i, i + 2));
  }
  return pairs;
}

getFirstThree(){
  this.propertyService.getFirstThree().subscribe(
    (data : any) => {
      console.log(data);
      this.properties = data.data;
    }, (error) => {
      console.log(error);
    }

  )
}


}