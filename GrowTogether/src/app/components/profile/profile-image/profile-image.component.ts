import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { ProfileService } from '../profile.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { AppState } from 'src/app/store/app.state';
import { Store } from '@ngrx/store';
import { getUserId } from '../../user-auth/state/auth.selector';
import { Observable, of } from 'rxjs';
import { getProfileImageStart, uploadProfileImageStart } from '../state/profile.actions';
import { getProfileImage } from '../state/profile.selector';
import { addEmptyPlant } from '../../plant/state/plant/plant.action';

@Component({
  selector: 'app-profile-image',
  templateUrl: './profile-image.component.html',
  styleUrls: ['./profile-image.component.css']
})
export class ProfileImageComponent implements OnInit {
  imageUrl!:Observable<SafeUrl>;
  id!:number|undefined;

  constructor(
    private library:FaIconLibrary, 
    private profileService:ProfileService, 
    private store:Store<AppState>)
  {
    library.addIcons(faPen);
    this.store.select(getUserId).subscribe(id => this.id = id);
    this.store.dispatch(getProfileImageStart({id:this.id}));
  }
  ngOnInit(): void {
    this.imageUrl = this.store.select(getProfileImage);
  }


  uploadImage(event:Event)
  {
    const inputFile = <HTMLInputElement>(event.target);
    if(inputFile.files != null)
    {
      let file = inputFile?.files[0];
      this.store.dispatch(uploadProfileImageStart({id:this.id, file}));
    }
  }

  addPlant()
  {
    this.profileService.setShowModalState(true);
    this.store.dispatch(addEmptyPlant());
  }
}
