import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TokenManagement } from 'src/app/helpers/tokenManagement';
import { Exercise } from 'src/app/models/exercise';
import { ExerciseViewModel } from 'src/app/models/exerciseViewModel';
import { ProfileDTO } from 'src/app/models/profileDTO';
import { ExerciseService } from 'src/app/services/exercise-service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
	selector: 'app-exercise-page',
	templateUrl: './exercises-page.component.html',
	styleUrls: ['./exercises-page.component.css']
})
export class ExercisesPageComponent implements OnInit {

	@ViewChild('content') content: any;
	exercisesUserCreated: ExerciseViewModel[] = [];
	exercisesRecent: ExerciseViewModel[] = [];
	topExerciseCreatorProfiles: ProfileDTO[] = [];
	repsNumbersArray: number[] = Array.from(Array(30).keys());
	closeResult = '';

	constructor(private modalService: NgbModal, private exerciseService: ExerciseService) {
	}

	ngOnInit(): void {
		//Exercises created by user
		this.exerciseService.getExercisesCreated(TokenManagement.getTokenFromLocalStorage()).subscribe({
			next: (res) => {
				this.exercisesUserCreated = res;
			},
			error: (error) => {
			}
		})
		//Recent exercises
		this.exerciseService.getRecentExercises(TokenManagement.getTokenFromLocalStorage()).subscribe({
			next: (res) => {
				this.exercisesRecent = res;
			},
			error: (error) => {
			}
		})
		//Top exercise creators
		this.exerciseService.getTopExerciseCreators(TokenManagement.getTokenFromLocalStorage()).subscribe({
			next: (res) => {
				this.topExerciseCreatorProfiles = res;
			},
			error: (error) => {
			}
		})
	}

	open(content: any) {
		this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', keyboard: false }).result.then(
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
