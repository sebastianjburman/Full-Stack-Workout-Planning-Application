import { Exercise } from './exercise';

export class Workout {
  constructor(
    public id: number,
    public exercises: Exercise[],
    public workoutName: string,
    public createdAt: Date,
    public createdBy: string,
    public isPublic: boolean
  ) {}
}
