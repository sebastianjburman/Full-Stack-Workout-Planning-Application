import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TokenManagement } from 'src/app/helpers/tokenManagement';
import { UserAvatarManager } from 'src/app/helpers/userAvatarManager';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],

})
export class NavbarComponent implements OnInit {

  @ViewChild('content') content: any;
  userAvatarUrl:string = "../../../assets/Images/defaultUrl.png";

  constructor(private modalService: NgbModal, private userService: UserService) {
  }

  ngOnInit(): void {
    //Check if avatar url alreadu exist in local storage
    if(!UserAvatarManager.getAvatarUrlFromLocalStorage()){
      //Get avatar url and store in local storage 
      this.userService.getUser(TokenManagement.getTokenFromLocalStorage()).subscribe(res=>{
        if(res.profile.avatar){
          this.userAvatarUrl = res.profile.avatar;
          UserAvatarManager.saveAvatarUrlToLocalStorage(res.profile.avatar)
        }
        else{
          UserAvatarManager.saveAvatarUrlToLocalStorage(this.userAvatarUrl)
        }
      })
    }
    else{
      this.userAvatarUrl = UserAvatarManager.getAvatarUrlFromLocalStorage();
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
