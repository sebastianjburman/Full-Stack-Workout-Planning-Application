import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { matchValidator } from 'src/custom-validators/matchValidator';
import { UserService } from '../../services/user.service';
import { UserDTO } from 'src/app/models/userDTO';
import { ProfileDTO } from 'src/app/models/profileDTO';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-signuppage',
  templateUrl: './signuppage.component.html',
  styleUrls: ['./signuppage.component.css']
})
export class SignuppageComponent implements OnInit {

  signUpPageNum: Number = 1;
  modalTitle: string = "";
  modalBody: string = "";
  createdAccountSuccesfully: boolean = false;
  @ViewChild('content') content: any;

  signUpForm = new FormGroup({
    email: new FormControl('', [Validators.pattern(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/), Validators.required]),
    userName: new FormControl('', [Validators.pattern(/^[a-zA-Z0-9]([._-](?![._-])|[a-zA-Z0-9]){3,18}[a-zA-Z0-9]$/), Validators.required]),
    password: new FormControl('', [Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,20}$/), Validators.required]),
    passwordConfirmation: new FormControl('', [matchValidator('password'), Validators.required]),
    firstName: new FormControl('', [Validators.pattern(/^[a-zA-Z''-'\s]{1,40}$/), Validators.required]),
    lastName: new FormControl('', [Validators.pattern(/^[a-zA-Z''-'\s]{1,40}$/), Validators.required]),
    age: new FormControl('', [Validators.pattern(/^(?:[1-9][0-9]?|1[01][0-9]|120)$/), Validators.required]),
    currentWeight: new FormControl('', [Validators.min(10), Validators.max(999), Validators.required]),
    height: new FormControl('', [Validators.min(48), Validators.max(96), Validators.required]),
  });

  constructor(private userService: UserService, private modalService: NgbModal) { }

  ngOnInit(): void {
  }

  public changeSignUpPage(): void {
    if (this.signUpPageNum === 1 && this.validateFirstForm()) {
      this.signUpPageNum = 2;
    }
    else {
      this.signUpForm.markAllAsTouched();
    }
  }
  public goBackSignUpPage(): void {
    this.signUpPageNum = 1;
  }
  public createAccount(): void {
    if (this.signUpForm.valid) {
      const newUser: UserDTO = (this.signUpForm.value) as unknown as UserDTO
      const userName:string = this.formUserName?.value||"";
      newUser.profile = new ProfileDTO("","",userName)
      this.userService.createUser(newUser).subscribe(res => {
        this.modalTitle = "Succesfully Created Account"
        this.modalBody = "Click button below to go to login page"
        this.createdAccountSuccesfully = true;
        this.openVerticallyCentered()
      },
        (error) => {
          this.createdAccountSuccesfully = false;
          this.modalTitle = "Error Creating Account";
          this.modalBody = error.error;
          this.openVerticallyCentered()
        })
    }
    else {
      this.signUpForm.markAllAsTouched();
    }
  }

  public validateFirstForm(): boolean {
    if (this.formEmail?.valid && this.formUserName?.valid && this.formPassword?.valid && this.formPasswordConfirmation?.valid) {
      return true;
    }
    return false;
  }

  private openVerticallyCentered() {
    this.modalService.open(this.content, { centered: true });
  }

  get formEmail() { return this.signUpForm.get('email'); }
  get formUserName() { return this.signUpForm.get('userName'); }
  get formPassword() { return this.signUpForm.get('password'); }
  get formPasswordConfirmation() { return this.signUpForm.get('passwordConfirmation'); }
  get formFirstName() { return this.signUpForm.get("firstName") }
  get formLastName() { return this.signUpForm.get("lastName") }
  get formAge() { return this.signUpForm.get("age") }
  get formWeight() { return this.signUpForm.get("currentWeight") }
  get formHeight() { return this.signUpForm.get("height") }
}
