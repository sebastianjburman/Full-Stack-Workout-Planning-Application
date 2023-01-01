import { ProfileDTO } from "./profileDTO";
export class UserDTO {
    constructor(
        public email: string,
        public password: string,
        public userName: string,
        public firstName: string,
        public lastName: string,
        public age: Number,
        public currentWeight: Number,
        public height: Number,
        public profile:ProfileDTO
    ) {
    }
}