import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TokenManagement } from 'src/app/helpers/tokenManagement';
import { ExerciseViewModel } from 'src/app/models/exerciseViewModel';
import { ExerciseService } from 'src/app/services/exercise-service';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-exercise-view-page',
  templateUrl: './exercise-view-page.component.html',
  styleUrls: ['./exercise-view-page.component.css']
})
export class ExerciseViewPageComponent implements OnInit {

  @ViewChild('content') content: any;
  @ViewChild('copyExerciseModal') copyExerciseModal: any;
  closeResult = '';
  exercise: ExerciseViewModel | undefined

  constructor(
    private exerciseService: ExerciseService,
    private route: ActivatedRoute,
    private modalService: NgbModal,
    private router:Router,
    private toastService:ToastService) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(async (params) => {
      const id = params['id'];
      this.exerciseService.getExercise(id, TokenManagement.getTokenFromLocalStorage()).subscribe({
        next: (res) => {
          this.exercise = new ExerciseViewModel(res.id, res.name, res.description, res.sets, res.reps, res.createdByUsername, res.createdByPhotoUrl)
          if (!this.exercise.createdByPhotoUrl) {
            this.exercise.createdByPhotoUrl = '../../../assets/Images/defaultUrl.png';
          }
        },
        error: (error) => {
        }
      })
    })
  }

  deleteExercise(): void {
    this.exerciseService.deleteExercise(this.exercise!.id, TokenManagement.getTokenFromLocalStorage()).subscribe({
      next: (res) => {
        this.toastService.show("Successfully Deleted Exercise", { classname: "bg-success text-light", delay: 5000 ,header:"Success"});
        this.modalService.dismissAll()
        this.router.navigate(["/exercises"])
      },
      error: (error) => {
        this.toastService.show(error.error.message, { classname: 'bg-danger text-light', delay: 5000 ,header:"Error"});
        this.modalService.dismissAll()
      }
    })
  }

  open(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', centered: true}).result.then(
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

public isUsersExercise():boolean{
    if(localStorage.getItem('displayName') === this.exercise?.createdByUsername){
      return true;
    }
    return false;
  }
}
