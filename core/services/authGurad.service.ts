import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    // Check if the route allows public access
    const allowPublic = route.data['allowPublic'];
    if (allowPublic) {
      console.log('AuthGuard - Public access allowed for this route.');
      return true;
    }

    // Check if user is authenticated
    const isAuthenticated = this.checkIfAuthenticated();
    if (isAuthenticated) {
      console.log('AuthGuard - Authenticated, access granted.');
      return true;
    } else {
      console.log('AuthGuard - Not authenticated, redirecting to /login.');
      this.router.navigate(['/login']);
      return false;
    }
  }

  private checkIfAuthenticated(): boolean {
    const token = localStorage.getItem('access_token');
    return !!token; // Check if token exists
  }
}
