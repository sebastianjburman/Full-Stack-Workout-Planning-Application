import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-loginpage',
  templateUrl: './loginpage.component.html',
  styleUrls: ['./loginpage.component.scss']
})
export class LoginpageComponent implements OnInit {

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.pattern('^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'), Validators.required]),
    password: new FormControl('', Validators.required),
    rememberMe: new FormControl(false, Validators.required)
  });
  get formEmail() { return this.loginForm.get('email'); }
  get formPassword() { return this.loginForm.get('password'); }

  constructor() { }

  ngOnInit(): void {
  }

  login(): void {
    if (this.loginForm.valid) {
      alert("login")
    }
    else{
      this.loginForm.markAllAsTouched()
    }
  }
}
