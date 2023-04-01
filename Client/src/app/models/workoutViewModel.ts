export class WorkoutViewModel {
    constructor(
        public id: string,
        public workoutName: string,
        public workoutDescription: string,
        public exercises: string[],
        public isPublic: boolean,
        public userLiked : boolean,
        public createdByUsername: string,
        public createdByPhotoUrl: string,
        public createdAt: string
    ) { }
}