import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import {IconName, faGoogle} from '@fortawesome/free-brands-svg-icons';
import { faLock, faUser, faEyeSlash, faEye} from '@fortawesome/free-solid-svg-icons';
import {Store} from '@ngrx/store'
import {AppState} from '../../../store/app.state'
import { loginStart } from '../state/auth.actions';
import { setLoadingSpinner } from 'src/app/store/shared/shared.actions';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  type: string = "password";
  isText : boolean = false;
  eyeIcon: IconName = 'eye-slash'; 
  loginForm!: FormGroup;
  
  constructor(private fb: FormBuilder, library:FaIconLibrary, private store:Store<AppState>)
  {
    library.addIcons(faLock,faUser, faEyeSlash, faEye, faGoogle);
  }

  ngOnInit():void{
    this.loginForm=this.fb.group({
      email: ['',[Validators.required]],
      password:['',[Validators.required]]
    })
  }

  hideShowPass(){
    this.isText ? this.eyeIcon = "eye" : this.eyeIcon = 'eye-slash';
    this.isText ? this.type = "text" : this.type="password";
    this.isText = !this.isText;
  }

  onSubmit()
  {
    if(this.loginForm.valid){
      const email = this.loginForm.value.email;
      const password = this.loginForm.value.password;

      this.store.dispatch(setLoadingSpinner({status:true}));
      this.store.dispatch(loginStart({email, password}));
      
    }else{
      this.validateAllFormsFields(this.loginForm)
      alert("Form is incorrect");
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
  }
