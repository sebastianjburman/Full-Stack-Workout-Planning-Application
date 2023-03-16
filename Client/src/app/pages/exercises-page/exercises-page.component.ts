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

	createExerciseForm = new FormGroup({
		name: new FormControl('', [
			Validators.required,
			Validators.pattern(/^[a-zA-Z''-'\s]{5,30}$/)]),
		description: new FormControl('', [
			Validators.required,
			Validators.pattern(/^[a-zA-Z''-''.','\s]{10,400}$/)]),
		sets: new FormControl(1, [
			Validators.required]),
		reps: new FormControl(1, [
			Validators.required]),
	});

	constructor(private modalService: NgbModal, private exerciseService: ExerciseService, private toastService:ToastService, private router:Router) {
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

	createExercise() {
		if (this.createExerciseForm.valid) {
			const createdExercise: Exercise = (this.createExerciseForm.value) as unknown as Exercise;
			this.exerciseService.createExercise(createdExercise, TokenManagement.getTokenFromLocalStorage()).subscribe({
				next: (res) => {
					this.toastService.show("Successfully Created Exercise", { classname: "bg-success text-light", delay: 5000 ,header:"Success"});
					this.clearExerciseForm();
					this.modalService.dismissAll();
					this.router.navigate([`/exercise/${res}`],)
				},
				error: (error) => {
					this.toastService.show(error.error.message, { classname: 'bg-danger text-light', delay: 5000 ,header:"Error"});
				}
			})
		}
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

	public clearExerciseForm(): void {
		this.createExerciseForm.get('name')?.reset();
		this.createExerciseForm.get('description')?.reset();
		this.createExerciseForm.get('sets')?.setValue(1);
		this.createExerciseForm.get('reps')?.setValue(1);
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

	get formName() { return this.createExerciseForm.get('name'); }
	get formDescription() { return this.createExerciseForm.get('description'); }

}
