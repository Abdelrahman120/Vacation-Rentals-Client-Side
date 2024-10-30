import { Component } from '@angular/core';
import { SidebarComponent } from "../../admin-dashboard/sidebar/sidebar.component";
import { AdminServices } from '../../services/admin-services.service';

@Component({
  selector: 'app-testimonial',
  standalone: true,
  imports: [SidebarComponent],
  templateUrl: './testimonial.component.html',
  styleUrl: './testimonial.component.css'
})
export class TestimonialComponent {

  constructor (private testmonialService: AdminServices){}

  ngOnInit(): void {
    this.loadTestmonials()
    }
  testmonials: any[] = [];
  loadTestmonials() {
    this.testmonialService.getTestmonials().subscribe(
      (data) => {
        this.testmonials = data.data;    
      }, (error) => {
        console.log(error);
      }
    )
  } 
  deleteTestmonial(id: number) {
    this.testmonialService.deleteTestmonial(id).subscribe(
      (data) => {
        this.loadTestmonials();
      }, (error) => {
        console.log(error);
      }
    )
  }
}
