export class UserData {
    constructor(
        public userID: number,
        public userName: string,
        public userEMail: string,
        public organizationName: string,
        public userPassword: string,
        public token: string
    ) { }
}
