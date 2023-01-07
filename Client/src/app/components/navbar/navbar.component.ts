import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TokenManagement } from 'src/app/helpers/tokenManagement';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],

})
export class NavbarComponent implements OnInit {

  @ViewChild('content') content: any;

  constructor(private modalService: NgbModal){
  }

  ngOnInit(): void {
  }

  public initiateLogoutModal(){
    this.modalService.open(this.content, { centered: true });
  }
  public logout():void{
    TokenManagement.removeTokenFromLocalStorage();
    location.reload();
  } 
}
