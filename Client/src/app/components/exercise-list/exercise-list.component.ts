import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Exercise } from 'src/app/models/exercise';

@Component({
  selector: 'app-exercise-list',
  templateUrl: './exercise-list.component.html',
  styleUrls: ['./exercise-list.component.css']
})
export class ExerciseListComponent implements OnInit {

  @Input() exerciseId!: string;
  @Input() exerciseName!: string;
  @Input() exerciseDescription!: string;
  @Output() removeExercise = new EventEmitter<string>();
  
  constructor() { }

  ngOnInit(): void {
  }

  remove() {
    this.removeExercise.emit(this.exerciseId);
  }

}
