import { Exercise } from './exercise';

export class Workout {
  constructor(
    public id: string,
    public exercises: string[],
    public workoutName: string,
    public createdAt: Date,
    public createdBy: string,
    public isPublic: boolean
  ) {}
}
