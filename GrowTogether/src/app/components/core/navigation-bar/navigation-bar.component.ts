import { Component, OnInit } from '@angular/core';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/store/app.state';
import { isAuthenticated } from '../../user-auth/state/auth.selector';
import { loginSuccess } from '../../user-auth/state/auth.actions';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css']
})
export class NavigationBarComponent implements OnInit {

  isAuthenticated!: Observable<boolean>;
  constructor(library:FaIconLibrary, private store:Store<AppState>)
  {
    library.addIcons(faUser);
  }
  ngOnInit():void{
    this.isAuthenticated = this.store.select(isAuthenticated);
  }

  logout()
  {
    this.store.dispatch(loginSuccess({user:null}));
  }
}
