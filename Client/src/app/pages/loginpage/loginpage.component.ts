import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserLoginDTO } from 'src/app/models/userLoginDTO';
import { UserService } from 'src/app/services/user.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

@Component({
  selector: 'app-loginpage',
  templateUrl: './loginpage.component.html',
  styleUrls: ['./loginpage.component.scss']
})
export class LoginpageComponent implements OnInit {
  @ViewChild('content') content: any;
  loginModalBody: String = "";
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.pattern(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/), Validators.required]),
    password: new FormControl('',[Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,20}$/) ,Validators.required]),
    rememberMe: new FormControl(false, Validators.required)
  });

  constructor(private userService: UserService, private modalService: NgbModal, private _router: Router) { }

  ngOnInit(): void {
  }

  login(): void {
    if (this.loginForm.valid) {
      const loginUser: UserLoginDTO = (this.loginForm.value) as unknown as UserLoginDTO


      this.userService.authenticate(loginUser).subscribe({
        next: (res) => {
          this.saveTokenToLocalStorage(res.token);
          this._router.navigate(['/'])
        },
        error: (error) => {
          this.loginModalBody = error.error;
          this.openVerticallyCentered()
        }
      })
    }
    else {
      this.loginForm.markAllAsTouched()
    }
  }
  private openVerticallyCentered() {
    this.modalService.open(this.content, { centered: true });
  }

  private saveTokenToLocalStorage(token:string){
    localStorage.setItem('token', token);
  }

  get formEmail() { return this.loginForm.get('email'); }
  get formPassword() { return this.loginForm.get('password'); }
}
