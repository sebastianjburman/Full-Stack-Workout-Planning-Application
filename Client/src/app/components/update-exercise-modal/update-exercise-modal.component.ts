import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TokenManagement } from 'src/app/helpers/tokenManagement';
import { Exercise } from 'src/app/models/exercise';
import { ExerciseViewModel } from 'src/app/models/exerciseViewModel';
import { ExerciseService } from 'src/app/services/exercise-service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-update-exercise-modal',
  templateUrl: './update-exercise-modal.component.html',
  styleUrls: ['./update-exercise-modal.component.css']
})
export class UpdateExerciseModalComponent implements OnInit {

  updateExerciseForm = new FormGroup({
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
	@Input() exerciseToUpdate?: ExerciseViewModel;
  @Output() refreshExercisePage: EventEmitter<any> = new EventEmitter();

	constructor(private modalService: NgbModal, private exerciseService: ExerciseService, private toastService: ToastService, private router: Router) { }

	ngOnInit(): void {
    this.initiateCopyExercise()
	}

	updateExercise() {
		if (this.updateExerciseForm.valid) {
			const updatedExercise: Exercise = (this.updateExerciseForm.value) as unknown as Exercise;
      updatedExercise.id = this.exerciseToUpdate!.id;
			this.exerciseService.updateExercise(updatedExercise, TokenManagement.getTokenFromLocalStorage()).subscribe({
				next: (res) => {
					this.toastService.show("Successfully Update Exercise", { classname: "bg-success text-light", delay: 5000, header: "Success" });
					this.clearExerciseForm();
					this.modalService.dismissAll();
          this.refreshExercisePage.emit();
				},
				error: (error) => {
					this.toastService.show(error.error.message, { classname: 'bg-danger text-light', delay: 5000, header: "Error" });
				}
			})
		}
	}
	public initiateCopyExercise(){
		this.updateExerciseForm.get('name')?.setValue(this.exerciseToUpdate!.name);
		this.updateExerciseForm.get('description')?.setValue(this.exerciseToUpdate!.description);
		this.updateExerciseForm.get('sets')?.setValue(this.exerciseToUpdate!.sets);
		this.updateExerciseForm.get('reps')?.setValue(this.exerciseToUpdate!.reps);	
	}

	public clearExerciseForm(): void {
		this.updateExerciseForm.get('name')?.reset();
		this.updateExerciseForm.get('description')?.reset();
		this.updateExerciseForm.get('sets')?.setValue(1);
		this.updateExerciseForm.get('reps')?.setValue(1);
	}

	public clearAllModals(): void {
		this.modalService.dismissAll();
	}

	get formName() { return this.updateExerciseForm.get('name'); }
	get formDescription() { return this.updateExerciseForm.get('description'); }

}
