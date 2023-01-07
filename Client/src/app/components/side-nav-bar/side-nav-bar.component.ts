import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TokenManagement } from 'src/app/helpers/tokenManagement';

@Component({
  selector: 'app-side-nav-bar',
  templateUrl: './side-nav-bar.component.html',
  styleUrls: ['./side-nav-bar.component.css']
})
export class SideNavBarComponent implements OnInit {
  @ViewChild('content') content: any;

  constructor(private router: Router, private modalService: NgbModal) { }

  ngOnInit(): void {
  }

  public initiateLogoutModal() {
    this.modalService.open(this.content, { centered: true });
  }
  public logout(): void {
    TokenManagement.clearLocalStorage();
    location.reload();
  }

  checkHighlightedSideMenuItem(pageMenuItemsLoads: string): boolean {
    if (this.router.url.includes(pageMenuItemsLoads)) {
      return true;
    }
    return false;
  }
}
