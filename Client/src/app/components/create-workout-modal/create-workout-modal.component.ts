import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-create-workout-modal',
  templateUrl: './create-workout-modal.component.html',
  styleUrls: ['./create-workout-modal.component.css']
})
export class CreateWorkoutModalComponent implements OnInit {

  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
  }
  public clearAllModals(): void {
		this.modalService.dismissAll();
	}

}
