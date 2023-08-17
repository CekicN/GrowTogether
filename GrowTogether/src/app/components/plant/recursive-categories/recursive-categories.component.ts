import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-recursive-categories',
  templateUrl: './recursive-categories.component.html',
  styleUrls: ['./recursive-categories.component.css']
})
export class RecursiveCategoriesComponent {
  @Input() recursiveList!:any;
  opened:boolean = false;

  constructor()
  {

  }
  toggleSubmenu() {
    this.opened = !this.opened;
  }
  open()
  {
    this.opened = true;
  }
  close()
  {
    this.opened = false;
  }
  navigate(routerLink: string) {
    console.log(this.recursiveList);
  }

  checkProperty(prop : any)
  {
    return prop && prop.length > 0;
  }
}
