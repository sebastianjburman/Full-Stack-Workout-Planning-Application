import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-signuppage',
  templateUrl: './signuppage.component.html',
  styleUrls: ['./signuppage.component.css']
})
export class SignuppageComponent implements OnInit {

  signUpPageNum:Number = 1;
  
  constructor() { }

  ngOnInit(): void {
  }

  public changeSignUpPage():void{
    if(this.signUpPageNum === 1){
      this.signUpPageNum = 2;
    }
    else{
      this.signUpPageNum = 1;
    }
  }

}
