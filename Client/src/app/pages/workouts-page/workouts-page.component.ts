import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-workouts-page',
  templateUrl: './workouts-page.component.html',
  styleUrls: ['./workouts-page.component.css']
})
export class WorkoutsPageComponent implements OnInit {

  @ViewChild('createdWorkoutModal') createdWorkoutModal: any;
  closeResult: string = '';

  constructor(private modalService: NgbModal) {}

  ngOnInit(): void {
  }

	open(createdWorkoutModal: any) {
		this.modalService.open(createdWorkoutModal, { ariaLabelledBy: 'modal-basic-title', size:"lg"}).result.then(
			(result) => {
				this.closeResult = `Closed with: ${result}`;
			},
			(reason) => {
				this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
			},
		);
	}

	private getDismissReason(reason: any): string {
		if (reason === ModalDismissReasons.ESC) {
			return 'by pressing ESC';
		} else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
			return 'by clicking on a backdrop';
		} else {
			return `with: ${reason}`;
		}
	}

}
