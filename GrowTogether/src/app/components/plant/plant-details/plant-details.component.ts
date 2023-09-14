import { Component } from '@angular/core';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faShoppingCart, faXmark } from '@fortawesome/free-solid-svg-icons';
import { Store, select } from '@ngrx/store';
import { Plant } from 'src/app/Models/plant.model';
import { AppState } from 'src/app/store/app.state';
import { PlantService } from '../plant.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { selectPlantById } from '../state/plant/plant.selector';
import { Observable } from 'rxjs';
import { orderDto } from 'src/app/Dto/order.dto';
import { plantContact } from '../state/plant/plant.action';

@Component({
  selector: 'app-plant-details',
  templateUrl: './plant-details.component.html',
  styleUrls: ['./plant-details.component.css']
})
export class PlantDetailsComponent {
  plant!:Observable<Plant|undefined>;
  displayStyle!:boolean;
  contactForm!:FormGroup;
  constructor(private store:Store<AppState>, private library:FaIconLibrary, private plantService:PlantService, private fb:FormBuilder){
    library.addIcons(faXmark, faShoppingCart)
    plantService.showModal$.subscribe(value => this.displayStyle = value);
    plantService.plantId$.subscribe(value => {
      this.plant = store.pipe(select(selectPlantById, {id:value}))
    })
  }

  ngOnInit():void{
    this.contactForm=this.fb.group({
      email: ['',[Validators.required]],
      quantity:['',[Validators.required]]
    })
  }
  closeModal()
  {
    this.plantService.setShowModalState(false, -1);
  }

  Contact()
  {
    let id:number = -1;
    this.plant.subscribe(val => {
      if(val)
        id = val.id
    });
    const order:orderDto = {
      ...this.contactForm.value,
      plantId:id
    }

    this.store.dispatch(plantContact({order}));
  }
}
