import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TokenManagement } from 'src/app/helpers/tokenManagement';
import { UserProfileManager} from 'src/app/helpers/userAvatarManager';
import { ProfileDTO } from 'src/app/models/profileDTO';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],

})
export class NavbarComponent implements OnInit {

  @ViewChild('content') content: any;
  userAvatarUrl:string = "";
  username:string = "";

  constructor(private modalService: NgbModal, private userService: UserService) {
  }

  ngOnInit(): void {
    //Check if avatar url and username already exist in local storage
    if(!(UserProfileManager.getAvatarUrlFromLocalStorage() && UserProfileManager.getUsernameFromLocalStorage())){
      //Get avatar url and username and store it in local storage 
      this.userService.getUserProfile(TokenManagement.getTokenFromLocalStorage()).subscribe(res=>{
        const profile:ProfileDTO = res;
        if(profile.avatar){
          this.userAvatarUrl = profile.avatar;
        }
        else{
          this.userAvatarUrl = "../../../assets/Images/defaultUrl.png";
        }
        UserProfileManager.saveAvatarUrlToLocalStorage(this.userAvatarUrl);

        if(profile.userName){
          this.username = profile.userName;
          UserProfileManager.saveUsernameToLocalStorage(profile.userName);
        }
      })
    }
    else{
      this.userAvatarUrl = UserProfileManager.getAvatarUrlFromLocalStorage();
      this.username = UserProfileManager.getUsernameFromLocalStorage()
    }
  }

  public initiateLogoutModal() {
    this.modalService.open(this.content, { centered: true });
  }
  public logout(): void {
    TokenManagement.clearLocalStorage();
    location.reload();
  }
}
