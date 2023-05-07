import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-top-workout-preview',
  templateUrl: './top-workout-preview.component.html',
  styleUrls: ['./top-workout-preview.component.css']
})
export class TopWorkoutPreviewComponent implements OnInit {

  @Input() Id!: string;
  @Input() workoutName!: string;
  @Input() workoutDescription!: string;
  @Input() exerciseCount!: number;
  @Input() createdByUsername!: string;
  @Input() createdByPhotoUrl!: string;
  @Input() isPublic!: boolean;
  @Input() likes!: number;

  constructor() { }

  ngOnInit(): void {
    if(!this.createdByPhotoUrl){
      this.createdByPhotoUrl = '../../../assets/Images/defaultUrl.png';
    }
  }

}
