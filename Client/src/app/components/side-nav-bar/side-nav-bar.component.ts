import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-nav-bar',
  templateUrl: './side-nav-bar.component.html',
  styleUrls: ['./side-nav-bar.component.css']
})
export class SideNavBarComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  checkHighlightedSideMenuItem(pageMenuItemsLoads:string):boolean{
    if(this.router.url.includes(pageMenuItemsLoads)){
      return true;
    }
    return false;
  }
}
