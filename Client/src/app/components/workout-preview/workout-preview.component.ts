import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-workout-preview',
  templateUrl: './workout-preview.component.html',
  styleUrls: ['./workout-preview.component.css']
})
export class WorkoutPreviewComponent implements OnInit {

  @Input() Id!: string;
  @Input() workoutName!: string;
  @Input() workoutDescription!: string;
  @Input() exerciseCount!: number;
  @Input() createdByUsername!: string;
  @Input() createdByPhotoUrl!: string;
  
  constructor() { }

  ngOnInit(): void {
  }

}
