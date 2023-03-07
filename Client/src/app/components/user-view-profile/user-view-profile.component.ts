import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-view-profile',
  templateUrl: './user-view-profile.component.html',
  styleUrls: ['./user-view-profile.component.css']
})
export class UserViewProfileComponent implements OnInit {

  @Input() avatar:string | undefined;
  @Input() userName: string | undefined;

  constructor() { }

  ngOnInit(): void {
    if(!this.avatar){
      this.avatar = '../../../assets/Images/defaultUrl.png';
    }
  }

}
