import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TokenManagement } from 'src/app/helpers/tokenManagement';
import { WorkoutViewModel } from 'src/app/models/workoutViewModel';
import { ToastService } from 'src/app/services/toast.service';
import { WorkoutService } from 'src/app/services/workout.service';

@Component({
  selector: 'app-workout-view-page',
  templateUrl: './workout-view-page.component.html',
  styleUrls: ['./workout-view-page.component.css']
})
export class WorkoutViewPageComponent implements OnInit {

  @ViewChild('content') content: any;
  closeResult = '';
  workout: WorkoutViewModel | undefined
  workoutExercises: any[] = [];

  constructor(
    private workoutService: WorkoutService,
    private route: ActivatedRoute,
    private modalService: NgbModal,
    private router: Router,
    private toastService: ToastService) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(async (params) => {
      const id = params['id'];
      this.workoutService.getWorkout(id, TokenManagement.getTokenFromLocalStorage()).subscribe({
        next: (res) => {
          this.workout = res;
          if (!this.workout?.createdByPhotoUrl) {
            this.workout!.createdByPhotoUrl = '../../../assets/Images/defaultUrl.png';
          }
        },
        error: (error) => {
        }
      })

      this.workoutService.getWorkoutExercises(TokenManagement.getTokenFromLocalStorage(), id).subscribe({
        next: (res) => {
          console.log(res)
          this.workoutExercises = res;
        },
        error: (error) => {
        }
      })
    })
  }

  open(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', centered: true }).result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      },
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

  public isUsersWorkout(): boolean {
    if (localStorage.getItem('displayName') === this.workout?.createdByUsername) {
      return true;
    }
    return false;
  }

  public likeWorkout(): void {
    this.workoutService.likeWorkout(TokenManagement.getTokenFromLocalStorage(), this.workout!.id).subscribe({
      next: (res) => {
        this.workout!.userLiked = !this.workout!.userLiked;
      },
      error: (res) => {
      }
    })
  }

  public unlikeWorkout(): void {
    this.workoutService.unlikeWorkout(TokenManagement.getTokenFromLocalStorage(), this.workout!.id).subscribe({
      next: (res) => {
        this.workout!.userLiked = !this.workout!.userLiked;
      },
      error: (res) => {
      }
    })
  }

  public deleteWorkout(): void {
    this.workoutService.deleteWorkout(this.workout!.id, TokenManagement.getTokenFromLocalStorage()).subscribe({
      next: (res) => {
        this.toastService.show("Workout deleted successfully", { classname: "bg-success text-light", delay: 5000 ,header:"Success"});
        this.modalService.dismissAll();
        this.router.navigate(['/workouts']);
      },
      error: (res) => {
        this.toastService.show('Something went wrong', { classname: 'bg-danger text-light', delay: 5000 ,header:"Error"});
      }
    })
  }
}
