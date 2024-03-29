export class TopWorkoutViewModel {
    constructor(
        public id: string,
        public workoutName: string,
        public workoutDescription: string,
        public exercises: string[],
        public isPublic: boolean,
        public createdByUsername: string,
        public createdByPhotoUrl: string,
        public createdAt: string,
        public likes: number
    ) { }
}