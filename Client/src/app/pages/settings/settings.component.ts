import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TokenManagement } from 'src/app/helpers/tokenManagement';
import { ToastService } from 'src/app/services/toast.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
})
export class SettingsComponent implements OnInit {
  closeResult = '';
  file: File | undefined;

  constructor(
    private modalService: NgbModal,
    private userService: UserService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {}

  open(content: any) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  onChange(event: any) {
    this.file = event.target.files[0];
  }

  public updateProfileImage() {
    if (this.file != undefined) {
      this.userService
        .uploadProfileImage(
          TokenManagement.getTokenFromLocalStorage(),
          this.file
        )
        .subscribe({
          next: (result) => {
            this.toastService.show('Successfully Updated Profile Photo. You May Need To Logout To Notice A Change In The Top Right.', {
              classname: 'bg-success text-light',
              delay: 5000,
              header: 'Success',
            });
            this.modalService.dismissAll();
          },
          error: (error) => {
            this.toastService.show('Error Updating Profile Photo', {
              classname: 'bg-danger text-light',
              delay: 5000,
              header: 'Error',
            });
          },
        });
    }
  }
  public clearProfileImage() {
    this.userService
      .clearProfileImage(TokenManagement.getTokenFromLocalStorage(), )
      .subscribe({
        next: (result) => {
          this.toastService.show('Successfully Removed Profile Photo', {
            classname: 'bg-success text-light',
            delay: 5000,
            header: 'Success',
          });
          this.modalService.dismissAll();
        },
        error: (error) => {
          this.toastService.show('Error Removing Profile Photo', {
            classname: 'bg-danger text-light',
            delay: 5000,
            header: 'Error',
          });
        },
      });
  }
}
