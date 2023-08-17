import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const api = "http://localhost:3000/"
@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http:HttpClient) { 
  }

  getCategories()
  {
    return this.http.get(`${api}category/getCategories`);
  }
  
}
