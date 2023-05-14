import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TokenManagement } from 'src/app/helpers/tokenManagement';
import { UserProfileManager } from 'src/app/helpers/userAvatarManager';
import { ProfileDTO } from 'src/app/models/profileDTO';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  @ViewChild('content') content: any;
  @ViewChild('searchModal') searchModel: any;
  userAvatarUrl: string = '';
  username: string = '';
  defaultAvatarUrl: string = '../../../assets/Images/defaultUrl.png';
  closeResult = '';
  searchCategory: string = 'Exercises';

  constructor(
    private modalService: NgbModal,
    private userService: UserService,
  ) {}

  ngOnInit(): void {
    //Check if avatar url and username already exist in local storage
    if (
      !(
        UserProfileManager.getAvatarUrlFromLocalStorage() &&
        UserProfileManager.getUsernameFromLocalStorage()
      )
    ) {
      //Get avatar url and username and store it in local storage
      this.userService
        .getUserProfile(TokenManagement.getTokenFromLocalStorage())
        .subscribe((res) => {
          const profile: ProfileDTO = res;
          if (profile.avatar) {
            this.userAvatarUrl = profile.avatar;
          } else {
            this.userAvatarUrl = '../../../assets/Images/defaultUrl.png';
          }
          UserProfileManager.saveAvatarUrlToLocalStorage(this.userAvatarUrl);

          if (profile.userName) {
            this.username = profile.userName;
            UserProfileManager.saveUsernameToLocalStorage(profile.userName);
          }
        });
    } else {
      this.userAvatarUrl = UserProfileManager.getAvatarUrlFromLocalStorage();
      this.username = UserProfileManager.getUsernameFromLocalStorage();
    }
  }

  public initiateLogoutModal() {
    this.modalService.open(this.content, { centered: true });
  }
  public logout(): void {
    TokenManagement.clearLocalStorage();
    location.reload();
  }
  handleImageError() {
    UserProfileManager.removeAvatarUrlFromLocalStorage();
  }

  openSearchModal(searchModal:any) {
		this.modalService.open(searchModal, { ariaLabelledBy: 'modal-basic-title', size:'lg' }).result.then(
			(result) => {
				this.closeResult = `Closed with: ${result}`;
			},
			(reason) => {
				this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
			},
		);
	}
  public setSearchCategory(category: string): void {
    this.searchCategory = category;
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
}
