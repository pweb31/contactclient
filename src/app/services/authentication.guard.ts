//import { isNull } from 'util';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import isNull from '@typeforce/is-null';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {
  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      // Récupération de l'utilisateur connecté
      //const isLoggedIn = !isNull(localStorage.getItem('currentUser'));
      const isLoggedIn = !isNull(localStorage.getItem('currentUser'));
      if (!isLoggedIn) {
        // Si pas d'utilisateur connecté : redirection vers la page de login
        alert('Vous n\'êtes pas connectés');
        console.log('Vous n\'êtes pas connectés');
        this.router.navigate(['/login']);
      } 
      return isLoggedIn;
  }
  
}
