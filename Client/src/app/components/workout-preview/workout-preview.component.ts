import { Component, Input, OnInit } from '@angular/core';
import { TokenManagement } from 'src/app/helpers/tokenManagement';
import { WorkoutService } from 'src/app/services/workout.service';

@Component({
  selector: 'app-workout-preview',
  templateUrl: './workout-preview.component.html',
  styleUrls: ['./workout-preview.component.css']
})
export class WorkoutPreviewComponent implements OnInit {

  @Input() Id!: string;
  @Input() workoutName!: string;
  @Input() workoutDescription!: string;
  @Input() exerciseCount!: number;
  @Input() userLiked!: boolean;
  @Input() createdByUsername!: string;
  @Input() createdByPhotoUrl!: string;

  constructor(private workoutService: WorkoutService) { }

  ngOnInit(): void {
    if (!this.createdByPhotoUrl) {
      this.createdByPhotoUrl = '../../../assets/Images/defaultUrl.png';
    }
  }

  public likeWorkout(): void {
    this.workoutService.likeWorkout(TokenManagement.getTokenFromLocalStorage(), this.Id).subscribe({
      next: (res) => {
        this.userLiked = !this.userLiked;
      },
      error: (res) => {
      }
    })
  }

  public unlikeWorkout(): void {
    this.workoutService.unlikeWorkout(TokenManagement.getTokenFromLocalStorage(), this.Id).subscribe({
      next: (res) => {
        this.userLiked = !this.userLiked;
      },
      error: (res) => {
      }
    })
  }



}
