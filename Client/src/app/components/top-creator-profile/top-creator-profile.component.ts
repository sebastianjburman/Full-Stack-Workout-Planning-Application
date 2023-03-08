import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-top-creator-profile',
  templateUrl: './top-creator-profile.component.html',
  styleUrls: ['./top-creator-profile.component.css']
})
export class TopCreatorProfileComponent implements OnInit {

  @Input() avatar:string | undefined;
  @Input() userName: string | undefined;
  
  constructor() { }

  ngOnInit(): void {
    if(!this.avatar){
      this.avatar = '../../../assets/Images/defaultUrl.png';
    }
  }

}
