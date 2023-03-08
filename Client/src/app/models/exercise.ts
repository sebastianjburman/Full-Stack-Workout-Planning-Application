export class Exercise {
  constructor(
    public id: number,
    public name: string,
    public description: string,
    public sets: number,
    public reps: number,
    public createdBy: string
  ) {}
}
