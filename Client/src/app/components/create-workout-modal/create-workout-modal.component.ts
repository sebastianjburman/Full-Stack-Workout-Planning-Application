import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { catchError, debounceTime, distinctUntilChanged, map, Observable, of, OperatorFunction, switchMap, tap } from 'rxjs';
import { TokenManagement } from 'src/app/helpers/tokenManagement';
import { Exercise } from 'src/app/models/exercise';
import { Workout } from 'src/app/models/workout';
import { ExerciseService } from 'src/app/services/exercise-service';
import { ToastService } from 'src/app/services/toast.service';
import { WorkoutService} from 'src/app/services/workout.service';

@Component({
  selector: 'app-create-workout-modal',
  templateUrl: './create-workout-modal.component.html',
  styleUrls: ['./create-workout-modal.component.css']
})
export class CreateWorkoutModalComponent implements OnInit {

  model: any;
  searching = false;
  searchFailed = false;
  exerciseListMax = 15;
  workoutExercises: Exercise[] = [];
  createWorkoutForm = new FormGroup({
    workoutName: new FormControl('', [Validators.pattern(/^[a-zA-Z''-'\s]{5,30}$/), Validators.required]),
    workoutDescription: new FormControl('', [Validators.pattern(/^[a-zA-Z''-''.','\s]{10,400}$/), Validators.required]),
    isPublic: new FormControl(true, Validators.required)
  });

  constructor(private modalService: NgbModal, private exerciseService: ExerciseService, private toastService: ToastService, private workoutService:WorkoutService) { }

  ngOnInit(): void {
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

  createWorkout(): void {
    const workout: Workout = (this.createWorkoutForm.value) as Workout;
    const exercises = this.workoutExercises.map(ex => ex.id);
    workout.exercises = exercises;
    this.workoutService.createWorkout(workout,TokenManagement.getTokenFromLocalStorage()).subscribe({
      next: (res) => {
        this.toastService.show("Successfully Created Workout", { classname: "bg-success text-light", delay: 5000, header: "Success" });
        this.modalService.dismissAll();
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
  get formName() { return this.createWorkoutForm.get('workoutName'); }
  get formDescription() { return this.createWorkoutForm.get('workoutDescription'); }
  get formIsPublic() { return this.createWorkoutForm.get('isPublic'); }
  formatter = (x: Exercise) => x.name;
}
