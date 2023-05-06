import { Component, OnInit, ViewChild } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { ChartConfiguration, ChartOptions, ChartType } from 'chart.js';
import { TokenManagement } from 'src/app/helpers/tokenManagement';
import { WeightEntry } from 'src/app/models/weightEntry';
import { WorkoutViewModel } from 'src/app/models/workoutViewModel';
import { ToastService } from 'src/app/services/toast.service';
import { UserService } from 'src/app/services/user.service';
import { WorkoutService } from 'src/app/services/workout.service';
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent implements OnInit {
  public monthsWeightEntries: WeightEntry[] = [];
  public pinnedWorkouts: WorkoutViewModel[] = [];
  @ViewChild('acc') weightEntryAccordian: any;
  public lineChartLegend = true;

  public lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: [],
    datasets: [
      {
        data: [],
        label: 'Weight(Ibs)',
        fill: false,
        tension: 0.5,
        borderColor: 'black',
        backgroundColor: 'rgb(24, 71, 122)',
        pointBackgroundColor: 'rgb(24, 71, 122)',
      },
    ],
  };

  public lineChartOptions: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
  };

  public weightEntryForm = new FormGroup({
    weightEntry: new FormControl('', [
      Validators.required,
      Validators.min(10),
      Validators.max(1000),
      this.doubleInRangeValidator(),
    ]),
  });

  constructor(
    private userService: UserService,
    private toastService: ToastService,
    private workoutService: WorkoutService
  ) {}

  ngOnInit(): void {
    this.getWeightEntries();
    this.getUserLikedWorkouts();
  }

  public getWeightEntries(): void {
    this.userService
      .getUserMonthlyWeightEntries(TokenManagement.getTokenFromLocalStorage())
      .subscribe({
        next: (weightEntries: WeightEntry[]) => {
          this.monthsWeightEntries = [...weightEntries].reverse();
          this.lineChartData.labels = weightEntries.map((x) =>
            new Date(x.date).toLocaleDateString('en-US')
          );
          this.lineChartData.datasets[0].data = weightEntries.map(
            (x) => x.weight
          );
          //Refresh chart
          this.lineChartOptions = { ...this.lineChartOptions };
        },
        error: (err) => {},
      });
  }

  public getUserLikedWorkouts(): void {
    this.workoutService
      .getWorkoutsLikedByUser(TokenManagement.getTokenFromLocalStorage())
      .subscribe({
        next: (workouts: WorkoutViewModel[]) => {
          this.pinnedWorkouts = workouts;
        },
      });
  }

  public addWeightEntryForToday(): void {
    this.userService
      .addWeightEntry(
        TokenManagement.getTokenFromLocalStorage(),
        new WeightEntry(
          '',
          parseFloat(this.formWeightEntry?.value!),
          new Date(),
          ''
        )
      )
      .subscribe({
        next: () => {
          this.toastService.show(`Succesfully Added Weight Entry`, {
            classname: 'bg-success text-light',
            delay: 5000,
            header: 'Success',
          });
          this.weightEntryAccordian.toggle('weightPanel');
          this.formWeightEntry?.setValue('');
          this.formWeightEntry?.reset();
          this.getWeightEntries();
        },
        error: (err) => {
          this.toastService.show(err.error, {
            classname: 'bg-danger text-light',
            delay: 5000,
            header: 'Error',
          });
        },
      });
  }

  public deleteWeightEntry(weightEntryId: string): void {
    this.userService
      .deleteWeightEntry(
        TokenManagement.getTokenFromLocalStorage(),
        weightEntryId
      )
      .subscribe({
        next: () => {
          this.toastService.show(`Succesfully Deleted Weight Entry`, {
            classname: 'bg-success text-light',
            delay: 5000,
            header: 'Success',
          });
          this.getWeightEntries();
        },
        error: (err) => {
          this.toastService.show(err.error, {
            classname: 'bg-danger text-light',
            delay: 5000,
            header: 'Error',
          });
        },
      });
  }

  get formWeightEntry() {
    return this.weightEntryForm.get('weightEntry');
  }

  private doubleInRangeValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const value = parseFloat(control.value);
      if (isNaN(value) || value < 10 || value > 1000) {
        return { doubleInRange: true };
      }
      return null;
    };
  }
}
