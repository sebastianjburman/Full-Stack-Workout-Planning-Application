export class Exercise {
  constructor(
    public id: string,
    public name: string,
    public description: string,
    public sets: number,
    public reps: number,
    public createdBy: string
  ) {}
}
