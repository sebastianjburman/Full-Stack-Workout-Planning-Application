export class UserLoginDTO {
    constructor(
        public email: string,
        public password: string,
        public rememberMe:boolean
    ) {
    }
}