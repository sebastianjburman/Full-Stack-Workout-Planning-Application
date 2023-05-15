import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TokenManagement } from 'src/app/helpers/tokenManagement';
import { UserProfileManager } from 'src/app/helpers/userAvatarManager';
import { ProfileDTO } from 'src/app/models/profileDTO';
import { UserService } from 'src/app/services/user.service';
import {Observable, OperatorFunction, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { Exercise } from 'src/app/models/exercise';
import { Workout } from 'src/app/models/workout';
import { ExerciseService } from 'src/app/services/exercise-service';
import { WorkoutService } from 'src/app/services/workout.service';
import { Router } from '@angular/router';

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

  model: any;
  searching = false;
  searchFailed = false;

  constructor(
    private modalService: NgbModal,
    private userService: UserService,
    private exerciseService: ExerciseService,
    private workoutService: WorkoutService,
    private router: Router
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

  openSearchModal(searchModal: any) {
    this.modalService
      .open(searchModal, { ariaLabelledBy: 'modal-basic-title', size: 'lg' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  closeSearchModal() {
    this.modalService.dismissAll();
  }
  public setSearchCategory(category: string): void {
    this.searchCategory = category;
  }

  searchExercise: OperatorFunction<string, readonly Exercise[]> = (
    text$: Observable<string>
  ) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      switchMap((search) => {
        if (search.length < 2) {
          return [];
        }
        return this.exerciseService.searchExercises(
          TokenManagement.getTokenFromLocalStorage(),
          search
        );
      })
    );

  searchWorkout: OperatorFunction<string, readonly Workout[]> = (
    text$: Observable<string>
  ) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      switchMap((search) => {
        if (search.length < 2) {
          return [];
        }
        return this.workoutService.searchWorkout(
          TokenManagement.getTokenFromLocalStorage(),
          search
        );
      })
    );

  searchProfile: OperatorFunction<string, readonly ProfileDTO[]> = (
    text$: Observable<string>
  ) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      switchMap((search) => {
        if (search.length < 2) {
          return [];
        }
        return this.userService.searchPeople(
          TokenManagement.getTokenFromLocalStorage(),
          search
        );
      })
    );

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  handleImageErrorSearch(event: any) {
    event.target.src = '../../../assets/Images/defaultUrl.png';
  }

  onSearchSelectExercise(searchItem: any): void {
    this.router.navigate(['/exercise', searchItem.item.id]);
    this.modalService.dismissAll();
  }
  onSearchSelectWorkout(searchItem: any): void {
    this.router.navigate(['/workout', searchItem.item.id]);
    this.modalService.dismissAll();
  }
  onSearchSelectProfile(searchItem: any): void {
    this.router.navigate(['/profile', searchItem.item.userName]);
    this.modalService.dismissAll();
  }

  exerciseFormatter = (x: Exercise) => x.name;
  workoutFormatter = (x: Workout) => x.workoutName;
  profileFormatter = (x: ProfileDTO) => x.userName;
}
