import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TokenManagement } from 'src/app/helpers/tokenManagement';
import { ProfileDTO } from 'src/app/models/profileDTO';
import { WorkoutViewModel } from 'src/app/models/workoutViewModel';
import { UserService } from 'src/app/services/user.service';
import { WorkoutService } from 'src/app/services/workout.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css'],
})
export class ProfilePageComponent implements OnInit {
  profile: ProfileDTO | undefined;
  createdWorkouts: WorkoutViewModel[] = [];
  isUsersProfile: boolean = false;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private workoutService: WorkoutService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const username = params['username'];
      this.userService
        .getUserProfileByUserName(
          TokenManagement.getTokenFromLocalStorage(),
          username
        ).subscribe({
          next: (res) => {
            this.isUsersProfile = false;
            this.profile = res;
            //If user has a profile avatar set it.
            if (this.profile?.avatar == null) {
              this.profile!.avatar = '../../../assets/Images/defaultUrl.png';
            }
            //Check if users profile
            if (this.profile?.userName == localStorage.getItem("displayName")) {
              this.workoutService.getWorkoutsCreated(TokenManagement.getTokenFromLocalStorage()).subscribe({
                next: (res) => {
                  this.createdWorkouts = res;
                  this.isUsersProfile = true;
                },
                error: (error) => {
                }
              })
            }
            else {
              this.workoutService.getWorkoutsCreatedByUsername(TokenManagement.getTokenFromLocalStorage(), username).subscribe({
                next: (res) => {
                  this.createdWorkouts = res;
                },
                error: (error) => {
                }
              })
            }
          },
          error: (error) => {
          }
        })

    });
  }
}
