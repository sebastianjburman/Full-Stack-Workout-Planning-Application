import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TokenManagement } from 'src/app/helpers/tokenManagement';
import { ProfileDTO } from 'src/app/models/profileDTO';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css'],
})
export class ProfilePageComponent implements OnInit {
  profileImg: string = '../../../assets/Images/defaultUrl.png';
  profileUsername: string = '';
  profileBio: string = '';
  constructor(
    private userService: UserService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const username = params['username'];
      this.userService
        .getUserProfileByUserName(
          TokenManagement.getTokenFromLocalStorage(),
          username
        ).subscribe({
        next: (res) => {
          const profile:ProfileDTO = res;
          //If user has a profile avatar set it.
          if(profile.avatar){
            this.profileImg = profile.avatar;
          }
          this.profileUsername = profile.userName;
          this.profileBio = profile.bio;
        },
        error: (error) => {
        }
      })

    });
  }
}
