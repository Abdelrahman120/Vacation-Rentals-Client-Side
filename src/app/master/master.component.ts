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
  testmonials: any[] = [];
  properties: any[] = [];

  ngOnInit(): void {
    this.getallTestmonials();
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

getallTestmonials() {
  this.testmonialService.getAllTestimonials().subscribe(
    (data) => {
      this.testmonials = data.data;   
      console.log(this.testmonials); 
    }, (error) => {
      console.log(error);
    }
  )
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