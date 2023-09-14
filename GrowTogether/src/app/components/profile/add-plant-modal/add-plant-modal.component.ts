import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ProfileService } from '../profile.service';
import { AppState } from 'src/app/store/app.state';
import { Store } from '@ngrx/store';
import { selectCategories, selectNewPlantId, selectNewPlantImages } from '../../plant/state/plant/plant.selector';
import { addPlant, addPlantImages, getCategories, getPlants } from '../../plant/state/plant/plant.action';
import { getUserId } from '../../user-auth/state/auth.selector';
import { addPlantDto } from 'src/app/Dto/add-plant.dto';
import { PlantService } from '../../plant/plant.service';


@Component({
  selector: 'app-add-plant-modal',
  templateUrl: './add-plant-modal.component.html',
  styleUrls: ['./add-plant-modal.component.css']
})
export class AddPlantModalComponent {

  displayStyle!:boolean;
  other = false;
  categories!:Category[];

  addPlantForm!:FormGroup;
  imageUrl:string[] = [];

  constructor(private fb:FormBuilder,
              private cdr:ChangeDetectorRef, 
              private profileService:ProfileService, 
              private plantService:PlantService,
              private store:Store<AppState>)
  {
    profileService.showModal$.subscribe(value => this.displayStyle = value);

    this.addPlantForm = fb.group({
      name:['', Validators.required],
      plantType:['', Validators.required],
      address:['', Validators.required],
      category:['',Validators.required],
      newCategory:[''],
      parentCategory:[''],
      description:['', Validators.required]
    },{validator:this.categoryValidator});
  }

  categoryValidator(formGroup: FormGroup) {
    const category = formGroup.get('category')?.value;
    const newCategory = formGroup.get('newCategory')?.value;
    const parentCategory = formGroup.get('parentCategory')?.value;

    if (category === 'others' && (!newCategory || !parentCategory)) {
      return { invalidCategory: true };
    }

    return null;
  }
  ngOnInit(): void {
    this.store.select(selectCategories).subscribe(categories => {
      this.categories = extractCategories(categories);
    });
    this.store.select(selectNewPlantImages).subscribe(images => this.imageUrl = images);
    this.store.dispatch(getCategories());
  }

  isOther(event:Event)
  {
    const select = <HTMLSelectElement>event.target;
    if(select.value == "others")
      this.other = true;
    else
      this.other = false;
    this.cdr.detectChanges();
  }

  closeModal()
  {

    
    this.addPlantForm.reset();
    this.profileService.setShowModalState(false);
  }
  addPlant()
  {
    if(this.addPlantForm.valid)
    {
      let plantId:number = -1;
      let userId:number = -1;
      const plantDto:addPlantDto = this.addPlantForm.value;
      this.store.select(selectNewPlantId).subscribe(val => plantId = val);
      this.store.select(getUserId).subscribe((val) => userId = val);
      //dispatch za novu biljku
      plantDto.userId = userId;
      this.profileService.setShowModalState(false);
      this.store.dispatch(addPlant({plantDto,plantId}))
    }  
    else
    {
      this.validateAllFormsFields(this.addPlantForm);
    }
  }
  private validateAllFormsFields(formGroup:FormGroup){
    Object.keys(formGroup.controls).forEach(field=>{
      const control = formGroup.get(field);
      if(control instanceof FormControl){
        control.markAsDirty({
          onlySelf:true
        });
      }else if(control instanceof FormGroup){
        this.validateAllFormsFields(control);
      }
    })

  }

  addPhotos(event:Event)
  {
    const files = (<HTMLInputElement>event.target).files;
    if(files)
    {
      this.store.dispatch(getPlants());
      const primitiveFileList:File[] = Array.from(files);
      console.log(primitiveFileList);
      let id:number = -1;
      this.store.select(selectNewPlantId).subscribe(value => id = value);
      //this.plantService.uploadImages(files, id).subscribe(res => console.log(res));
      this.store.dispatch(addPlantImages({files:primitiveFileList,id}))
    }
  }
}

interface Category {
  id: number;
  name: string;
}

function extractCategories(data: any[]): Category[] {
  const categories: Category[] = [];

  data.forEach((item) => {
    const category: Category = {
      id: item.id,
      name: item.name,
    };
    categories.push(category);

    if (item.subcategories && item.subcategories.length > 0) {
      const subcategories = extractCategories(item.subcategories);
      categories.push(...subcategories);
    }
  });
  return categories;
}
