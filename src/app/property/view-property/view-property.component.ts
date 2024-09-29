import { Component } from '@angular/core';
import { PropertyService } from '../../service/propertyService/property.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-property',
  standalone: true,
  imports: [],
  templateUrl: './view-property.component.html',
  styleUrl: './view-property.component.css'
})
export class ViewPropertyComponent {
  propertyId: string = '';
  constructor(private PropertyService: PropertyService, private route: ActivatedRoute) { }
  propertyDetails: any = {};
  ngOnInit(): void {
    this.propertyId = this.route.snapshot.paramMap.get('id') || '';

    this.PropertyService.viewProperty(Number(this.propertyId)).subscribe((res: any) => {
      this.propertyDetails = res.data;
      console.log(res.data);
    })
  }
}
