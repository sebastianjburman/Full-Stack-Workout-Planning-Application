import { Component, OnInit, ViewChild } from '@angular/core';
import { TokenManagement } from 'src/app/helpers/tokenManagement';
import { WorkoutViewModel } from 'src/app/models/workoutViewModel';
import { WorkoutService } from 'src/app/services/workout.service';

@Component({
	selector: 'app-workouts-page',
	templateUrl: './workouts-page.component.html',
	styleUrls: ['./workouts-page.component.css']
})
export class WorkoutsPageComponent implements OnInit {

	@ViewChild('createdWorkoutModal') createdWorkoutModal: any;
	closeResult: string = '';
	createdWorkouts: WorkoutViewModel[] = [];
	recentlyCreatedWorkouts: WorkoutViewModel[] = [];
	//Pagination

	//User Created List
	userCreatedPageNum: number = 1;
	userItemsOnPage: number = 5;

	//Recently Created List
	recentlyCreatedPageNum: number = 1;
	recentlyCreatedItemOnPage: number = 5;

	constructor(private workoutService: WorkoutService) { }

	ngOnInit(): void {
		this.workoutService.getWorkoutsCreated(TokenManagement.getTokenFromLocalStorage()).subscribe(({
			next: (res) => {
				this.createdWorkouts = res;
			},
			error: (error) => {
			}
		}))
		this.workoutService.getRecentlyCreatedWorkouts(TokenManagement.getTokenFromLocalStorage()).subscribe(({
			next: (res) => {
				this.recentlyCreatedWorkouts = res;
			},
			error: (error) => {
			}
		}))
	}
}
