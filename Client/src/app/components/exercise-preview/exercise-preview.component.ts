import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-exercise-preview',
  templateUrl: './exercise-preview.component.html',
  styleUrls: ['./exercise-preview.component.css']
})
export class ExercisePreviewComponent implements OnInit {
  @Input() exerciseId!: Number;
  @Input() exerciseName!: string;
  @Input() exerciseDescription!: string;
  @Input() exerciseCreatedByUsername!: string;
  @Input() exerciseCreatedByPhotoUrl!: string;
  constructor() { }

  ngOnInit(): void {
    if(!this.exerciseCreatedByPhotoUrl){
      this.exerciseCreatedByPhotoUrl = '../../../assets/Images/defaultUrl.png';
    }
  }

}
