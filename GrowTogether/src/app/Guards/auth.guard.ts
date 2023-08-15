import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AppState } from '../store/app.state';
import { Store } from '@ngrx/store';
import { isAuthenticated } from '../components/user-auth/state/auth.selector';

@Injectable({
  providedIn: 'root'
})
export class authGuard  {
  isAuthenticated!: boolean;
  constructor(private router:Router, private store:Store<AppState>){
    store.select(isAuthenticated).subscribe(val => this.isAuthenticated = val);
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if(this.isAuthenticated)
    {
      return true;
    }
    else
    {
      this.router.navigate(['/login'], {queryParams:{returnUrl:state.url}});
      return false;
    }
  }
}