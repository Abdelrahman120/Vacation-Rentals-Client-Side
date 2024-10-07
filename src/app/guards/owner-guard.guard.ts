
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { OwnerAuthService } from '../Services/owner-auth.service';

@Injectable({
  providedIn: 'root',
})
export class ownerGuardGuard implements CanActivate {
  constructor(private authService: OwnerAuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const user = this.authService.getCurrentUser(); 

    if (user && user.role === 'owner') {
      return true; 
    }
    this.router.navigate(['/login/owner']);
    return false;
  }
}
