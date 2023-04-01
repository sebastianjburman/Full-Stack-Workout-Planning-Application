import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
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
	//Pagination

	//User Created List
	userCreatedPageNum:number = 1;
	userItemsOnPage:number = 5;;

	constructor(private modalService: NgbModal, private workoutService: WorkoutService) { }

	ngOnInit(): void {
		this.workoutService.getWorkoutsCreated(TokenManagement.getTokenFromLocalStorage()).subscribe(({
			next: (res) => {
				this.createdWorkouts = res;
			},
			error: (error) => {
			}
		})
		)
	}

	open(createdWorkoutModal: any) {
		this.modalService.open(createdWorkoutModal, { ariaLabelledBy: 'modal-basic-title', size: "lg" }).result.then(
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

}
