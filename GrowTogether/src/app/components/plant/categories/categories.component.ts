import { Component, OnInit } from '@angular/core';
import { PlantService } from '../plant.service';
import { AppState } from 'src/app/store/app.state';
import { Store } from '@ngrx/store';
import { selectCategories } from '../state/plant/plant.selector';
import { getCategories } from '../state/plant/plant.action';


@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit{

  categories!:any;
  constructor(private store:Store<AppState>){}
  ngOnInit(): void {
    this.categories = this.store.select(selectCategories);
    this.store.dispatch(getCategories());
  }
}
