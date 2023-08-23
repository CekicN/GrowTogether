import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { addPlantDto } from 'src/app/Dto/add-plant.dto';
import { orderDto } from 'src/app/Dto/order.dto';
import { Plant } from 'src/app/Models/plant.model';

const api = "http://localhost:3000/"
@Injectable({
  providedIn: 'root'
})
export class PlantService {

  private _showModal$ = new BehaviorSubject<boolean>(false);
  showModal$ = this._showModal$.asObservable();
  private _plantId$ = new BehaviorSubject<number>(-1);
  plantId$ = this._plantId$.asObservable();

  constructor(private http:HttpClient) { }

  setShowModalState(val:boolean, id:number)
  {
    this._showModal$.next(val);
    this._plantId$.next(id);
  }
  getCategories()
  {
    return this.http.get(`${api}category/getCategories`);
  }

  getAllPlants()
  {
    return this.http.get<Plant[]>(`${api}plant/getAllPlants`);
  }

  getPhotosById(id:number)
  {
    return this.http.get(`${api}plant/getImage/${id}`);
  }

  addEmptyPlant()
  {
    return this.http.post(`${api}plant/addEmpty`, {headers:{'Content-Type':'application/json'}});
  }
  addPlant(plantDto:addPlantDto, plantId:number)
  {
    return this.http.patch(`${api}plant/addPlant/${plantId}`, plantDto);
  }

  uploadImages(files:File[], id:number)
  {
    let formData = new FormData();
    if(files)
      files.forEach(file => {
        formData.append('file', file, file.name)  
      });
    
    return this.http.post(`${api}plant/uploadImage/${id}`, formData)
  }

  addOrder(orderDto:orderDto)
  {
    return this.http.post(`${api}order/addOrder`, orderDto)
  }
}
