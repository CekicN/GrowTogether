import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

const api = "http://localhost:3000/user/"
@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private _showModal$ = new BehaviorSubject<boolean>(false);
  showModal$ = this._showModal$.asObservable();

  constructor(private http:HttpClient) { }


  setShowModalState(state:boolean)
  {
    this._showModal$.next(state);
  }
  getProfileImage(id:number|undefined)
  {
    const requestOptions:Object = { responseType:'blob' };

    return this.http.get<any>(`${api}profile-image/${id}`, requestOptions);
  }

  uploadImage(id:number|undefined, file:File)
  {
    let formData = new FormData();
    formData.append('file', file, file.name)
    const requestOptions:Object = { responseType:'blob' };
    return this.http.post<any>(`${api}uploadImage/${id}`, formData, requestOptions);
  }
}
