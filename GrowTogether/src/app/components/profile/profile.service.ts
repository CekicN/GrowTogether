import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

const api = "http://localhost:3000/user/"
@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http:HttpClient) { }

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
