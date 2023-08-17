import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecursiveCategoriesComponent } from './recursive-categories.component';

describe('RecursiveCategoriesComponent', () => {
  let component: RecursiveCategoriesComponent;
  let fixture: ComponentFixture<RecursiveCategoriesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecursiveCategoriesComponent]
    });
    fixture = TestBed.createComponent(RecursiveCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
