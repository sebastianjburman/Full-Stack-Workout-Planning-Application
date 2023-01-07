import { Component, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TokenManagement } from './helpers/tokenManagement';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild('content') content: any;
  title = 'workout-planning-application-client';

  constructor(private modalService: NgbModal){
  }

  public initiateLogoutModal(){
    this.modalService.open(this.content, { centered: true });
  }
  public logout():void{
    TokenManagement.removeTokenFromLocalStorage();
    location.reload();
  }
}
