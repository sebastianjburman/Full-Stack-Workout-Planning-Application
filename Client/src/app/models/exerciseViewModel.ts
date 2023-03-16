export class ExerciseViewModel {
    constructor(
      public id: string,
      public name: string,
      public description: string,
      public sets: number,
      public reps: number,
      public createdByUsername: string,
      public createdByPhotoUrl: string
    ) {}
  }