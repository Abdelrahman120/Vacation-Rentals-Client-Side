import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { OwnerAuthService } from '../Services/owner-auth.service';
import { LoginUserService } from '../services/login-user.service';

@Injectable({
  providedIn: 'root',
})
export class userGuard implements CanActivate {
  constructor(private authService: LoginUserService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const user = this.authService.getCurrentUser(); 

    if (user) {
      return true; 
    }
    this.router.navigate(['/login']);
    return false;
  }
}
