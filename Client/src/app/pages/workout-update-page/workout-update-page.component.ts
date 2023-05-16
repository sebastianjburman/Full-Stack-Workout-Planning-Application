import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, OperatorFunction, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { TokenManagement } from 'src/app/helpers/tokenManagement';
import { Exercise } from 'src/app/models/exercise';
import { Workout } from 'src/app/models/workout';
import { ExerciseService } from 'src/app/services/exercise-service';
import { ToastService } from 'src/app/services/toast.service';
import { WorkoutService } from 'src/app/services/workout.service';

@Component({
  selector: 'app-workout-update-page',
  templateUrl: './workout-update-page.component.html',
  styleUrls: ['./workout-update-page.component.css']
})
export class WorkoutUpdatePageComponent implements OnInit {

  model: any;
  searching = false;
  searchFailed = false;
  exerciseListMax = 15;
  workoutExercises: Exercise[] = [];
  updateWorkoutForm = new FormGroup({
    workoutName: new FormControl('', [Validators.pattern(/^[a-zA-Z''-'\s]{5,30}$/), Validators.required]),
    workoutDescription: new FormControl('', [Validators.pattern(/^[a-zA-Z''-''.','\s]{10,400}$/), Validators.required]),
    isPublic: new FormControl(true, Validators.required)
  });
  workoutToUpdate:Workout | undefined;

  constructor(private modalService: NgbModal, private exerciseService: ExerciseService, private toastService: ToastService, private workoutService: WorkoutService, private router:Router, private route: ActivatedRoute,) { }

  ngOnInit(): void {
    this.route.params.subscribe(async (params) => {
      const id = params['id'];
      this.workoutService.getWorkout(id, TokenManagement.getTokenFromLocalStorage()).subscribe({
        next: (res:Workout) => {
          this.workoutToUpdate = res;
          this.initiateCopyExercise(this.workoutToUpdate);
          console.log(this.workoutToUpdate)
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

  addWorkout() {
    if (this.model) {
      if (this.workoutExercises.length >= this.exerciseListMax) {
        this.toastService.show(`A workout can't have more than ${this.exerciseListMax} exercises`, { classname: 'bg-danger text-light', delay: 5000, header: "Error" })
      }
      else {
        this.workoutExercises.push(this.model);
        this.model = undefined;
      }
    }
  }

  removeExercise(exerciseId: string) {
    this.workoutExercises = this.workoutExercises.filter(exercise => exercise.id != exerciseId)
  }

  drop(event: CdkDragDrop<Exercise[]>) {
    moveItemInArray(this.workoutExercises, event.previousIndex, event.currentIndex);
  }

  updateWorkout(): void {
    const workout: Workout = (this.updateWorkoutForm.value) as Workout;
    const exercises = this.workoutExercises.map(ex => ex.id);
    workout.exercises = exercises;
    workout.id = this.workoutToUpdate!.id;
    this.workoutService.updateWorkout(workout, TokenManagement.getTokenFromLocalStorage()).subscribe({
      next: (res) => {
        this.toastService.show("Successfully Created Workout", { classname: "bg-success text-light", delay: 5000, header: "Success" });
        this.modalService.dismissAll();
        this.router.navigate(['/workout', workout.id]);
      },
      error: (error) => {
        this.toastService.show(error.error.message, { classname: 'bg-danger text-light', delay: 5000, header: "Error" });
      }
    })
  }

  search: OperatorFunction<string, readonly Exercise[]> = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      switchMap((search) => {
        if (search.length < 2) {
          return [];
        }
        return this.exerciseService.getExercisesCreatedSearch(TokenManagement.getTokenFromLocalStorage(), search)
      })
    );

  public clearAllModals(): void {
    this.modalService.dismissAll();
  }

  public initiateCopyExercise(workout: Workout): void {
		this.updateWorkoutForm.get('workoutName')?.setValue(workout.workoutName);
		this.updateWorkoutForm.get('workoutDescription')?.setValue(workout.workoutDescription);
		this.updateWorkoutForm.get('isPublic')?.setValue(workout.isPublic);
	}

  get formName() { return this.updateWorkoutForm.get('workoutName'); }
  get formDescription() { return this.updateWorkoutForm.get('workoutDescription'); }
  get formIsPublic() { return this.updateWorkoutForm.get('isPublic'); }
  formatter = (x: Exercise) => x.name;

}
