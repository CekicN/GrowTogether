import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Plant } from 'src/app/Models/plant.model';

const api = "http://localhost:3000/"
@Injectable({
  providedIn: 'root'
})
export class PlantService {

  constructor(private http:HttpClient) { }

  

  getAllPlants()
  {
    return this.http.get<Plant[]>(`${api}plant/getAllPlants`);
  }

  getPhotosById(id:number)
  {
    return this.http.get(`${api}plant/getImage/${id}`);
  }
}
