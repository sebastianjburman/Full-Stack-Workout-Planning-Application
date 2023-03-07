import { Component, OnInit } from '@angular/core';
import { TokenManagement } from 'src/app/helpers/tokenManagement';
import { ProfileDTO } from 'src/app/models/profileDTO';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-people-page',
  templateUrl: './people-page.component.html',
  styleUrls: ['./people-page.component.css']
})
export class PeoplePageComponent implements OnInit {

  profiles: ProfileDTO[] = [];

  constructor(private userService: UserService,) { }

  ngOnInit(): void {
    this.userService.getDiscoverProfiles(TokenManagement.getTokenFromLocalStorage()).subscribe({
      next: (res) => {
        this.profiles = res;
      },
      error: (error) => {
      }
    })
  }

}
