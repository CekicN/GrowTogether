import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-add-plant-modal',
  templateUrl: './add-plant-modal.component.html',
  styleUrls: ['./add-plant-modal.component.css']
})
export class AddPlantModalComponent {

  @Input() displayStyle:boolean = false;
  other = false;
  categories!:Category[];

  addPlantForm!:FormGroup;
  imageUrl:string[] = ["https://localhost:7200//uploads/common/noimage.png"];

  constructor(private fb:FormBuilder,
              private cdr:ChangeDetectorRef)
  {
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
    console.log(this.displayStyle);
    this.displayStyle = false;
  }
  addPlant()
  {
    if(this.addPlantForm.valid)
    {
      
      
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
