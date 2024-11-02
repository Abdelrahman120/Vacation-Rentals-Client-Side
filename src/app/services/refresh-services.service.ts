import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RefreshServicesService {

  private refreshRequired = new BehaviorSubject<boolean>(false);
  refreshRequireds = this.refreshRequired.asObservable();

  constructor() {}

  triggerRefresh() {
    console.log("Trigger refresh called");
    this.refreshRequired.next(true);
}


  // resetRefresh() {
  //   console.log("Test here 2 ");
    
  //   this.refreshRequired.next(false);
  // }
}
