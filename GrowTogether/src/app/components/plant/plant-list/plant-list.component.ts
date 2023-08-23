import { Component } from '@angular/core';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { PlantService } from '../plant.service';
import { Observable } from 'rxjs';
import { Plant } from 'src/app/Models/plant.model';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { selectPlants } from '../state/plant/plant.selector';
import { getPlants } from '../state/plant/plant.action';

@Component({
  selector: 'app-plant-list',
  templateUrl: './plant-list.component.html',
  styleUrls: ['./plant-list.component.css']
})
export class PlantListComponent {
  plants!:Plant[];

  //public productList!: Product[];
  constructor(library:FaIconLibrary, private plantService:PlantService, private store:Store<AppState>)
  {
    library.addIcons(faShoppingCart);
  }
  ngOnInit(): void {
    this.store.dispatch(getPlants());
    this.store.select(selectPlants).subscribe(value => this.plants = value);
    console.log(this.plants);  }

  addToCart(item: number) {
      this.plantService.setShowModalState(true, item);
  }
}
