import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(
    private _route: Router
  ) { }

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (localStorage.getItem('isLoggedIn')) {
      return true;
    }

    // navigate to login page
    
    this._route.navigateByUrl('login');
    return false;
  }

}