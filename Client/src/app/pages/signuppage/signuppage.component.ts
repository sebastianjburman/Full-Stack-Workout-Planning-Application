import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { matchValidator } from 'src/custom-validators/matchValidator';

@Component({
  selector: 'app-signuppage',
  templateUrl: './signuppage.component.html',
  styleUrls: ['./signuppage.component.css']
})
export class SignuppageComponent implements OnInit {

  signUpPageNum:Number = 1;
  signUpForm = new FormGroup({
    email: new FormControl('', [Validators.pattern(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/), Validators.required]),
    userName: new FormControl('', [Validators.pattern(/^[a-zA-Z0-9]([._-](?![._-])|[a-zA-Z0-9]){3,18}[a-zA-Z0-9]$/), Validators.required]),
    password: new FormControl('', [Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,20}$/),Validators.required]),
    passwordConfirmation: new FormControl('', [matchValidator('password'), Validators.required]),
    firstName: new FormControl('',[Validators.pattern(/^[a-zA-Z''-'\s]{1,40}$/), Validators.required]),
    lastName: new FormControl('', [Validators.pattern(/^[a-zA-Z''-'\s]{1,40}$/), Validators.required]),
    age: new FormControl('', [Validators.pattern(/^(?:[1-9][0-9]?|1[01][0-9]|120)$/), Validators.required]),
    weight: new FormControl('',[Validators.min(10), Validators.max(999), Validators.required]),
    height: new FormControl('', [Validators.min(48), Validators.max(96),Validators.required]),
  });
  
  constructor() { }

  ngOnInit(): void {
  }

  public changeSignUpPage():void{
    if(this.signUpPageNum === 1 && this.validateFirstForm()){
      this.signUpPageNum = 2;
    }
    else{
      this.signUpForm.markAllAsTouched();
    }
  }
  public goBackSignUpPage():void{
    this.signUpPageNum = 1;
  }
  public createAccount():void{
    if(this.signUpForm.valid){
      alert("created account");
    }
    else{
      this.signUpForm.markAllAsTouched();
    }
  }

  public validateFirstForm():boolean{
    if(this.formEmail?.valid && this.formUserName?.valid && this.formPassword?.valid && this.formPasswordConfirmation?.valid){
      return true;
    }
    return false; 
  }

  get formEmail(){ return this.signUpForm.get('email'); }
  get formUserName(){ return this.signUpForm.get('userName'); }
  get formPassword(){ return this.signUpForm.get('password');}
  get formPasswordConfirmation(){ return this.signUpForm.get('passwordConfirmation');}
  get formFirstName(){return this.signUpForm.get("firstName")}
  get formLastName(){return this.signUpForm.get("lastName")}
  get formAge(){return this.signUpForm.get("age")}
  get formWeight(){return this.signUpForm.get("weight")}
  get formHeight(){return this.signUpForm.get("height")}
}
