import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TokenManagement } from 'src/app/helpers/tokenManagement';
import { Exercise } from 'src/app/models/exercise';
import { ExerciseService } from 'src/app/services/exercise-service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-create-exercise-modal',
  templateUrl: './create-exercise-modal.component.html',
  styleUrls: ['./create-exercise-modal.component.css']
})
export class CreateExerciseModalComponent implements OnInit {
  
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
  
  repsNumbersArray: number[] = Array.from(Array(30).keys());

  constructor(private modalService: NgbModal,private exerciseService: ExerciseService, private toastService:ToastService, private router:Router) { }

  ngOnInit(): void {
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

  public clearExerciseForm(): void {
		this.createExerciseForm.get('name')?.reset();
		this.createExerciseForm.get('description')?.reset();
		this.createExerciseForm.get('sets')?.setValue(1);
		this.createExerciseForm.get('reps')?.setValue(1);
	}

  public clearAllModals():void{
    this.modalService.dismissAll();
  }

  get formName() { return this.createExerciseForm.get('name'); }
	get formDescription() { return this.createExerciseForm.get('description'); }
  

}
