import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilterService {
  private filteredPropertiesSubject = new BehaviorSubject<any[]>([]);
  filteredProperties$ = this.filteredPropertiesSubject.asObservable();

  updateFilteredProperties(properties: any[]) {
    this.filteredPropertiesSubject.next(properties);
  }
}
