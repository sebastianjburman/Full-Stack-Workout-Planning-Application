import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TokenManagement } from 'src/app/helpers/tokenManagement';
import { ExerciseViewModel } from 'src/app/models/exerciseViewModel';
import { ExerciseService } from 'src/app/services/exercise-service';

@Component({
  selector: 'app-exercise-view-page',
  templateUrl: './exercise-view-page.component.html',
  styleUrls: ['./exercise-view-page.component.css']
})
export class ExerciseViewPageComponent implements OnInit {

  exercise:ExerciseViewModel | undefined

  constructor(
    private exerciseService: ExerciseService,
    private route: ActivatedRoute) { 
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const id = params['id'];
      this.exerciseService
        .getExercise(
          id,
          TokenManagement.getTokenFromLocalStorage()
        ).subscribe({
          next: (res) => {
            this.exercise = new ExerciseViewModel(res.id,res.name,res.description,res.sets,res.reps,res.createdByUsername,res.createdByPhotoUrl)
            if(!this.exercise.createdByPhotoUrl){
              this.exercise.createdByPhotoUrl = '../../../assets/Images/defaultUrl.png';
            }
          },
          error: (error) => {
          }
        })

    });
  }

}
