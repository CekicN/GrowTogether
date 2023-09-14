import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../store/app.state';
import { getUser, isAuthenticated, role } from '../components/user-auth/state/auth.selector';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { User } from '../Models/user.model';

@Injectable({
  providedIn: 'root'
})
export class adminGuard  {

  isAuthenticated!: boolean;
  user!:User;

  constructor(private router:Router, private store:Store<AppState>){
    store.select(isAuthenticated).subscribe(val => this.isAuthenticated = val);
    store.select(getUser).subscribe((user) => {
      console.log(user);
      if(user)this.user = user
      });
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if(this.user.role == 'admin')
    {
      return true;
    }
    else
    {
      console.log(this.user);
      this.router.navigate(['/login'], {queryParams:{returnUrl:state.url}});
      return false;
    }
  }
}