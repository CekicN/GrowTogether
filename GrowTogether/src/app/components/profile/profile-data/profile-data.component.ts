import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User } from 'src/app/Models/user.model';
import { AppState } from 'src/app/store/app.state';
import { getUser } from '../../user-auth/state/auth.selector';

@Component({
  selector: 'app-profile-data',
  templateUrl: './profile-data.component.html',
  styleUrls: ['./profile-data.component.css']
})
export class ProfileDataComponent implements OnInit {

  user$!:Observable<User|null>
  constructor(private store:Store<AppState>){}

  ngOnInit(): void {
    this.user$ = this.store.select(getUser);
  }

}
