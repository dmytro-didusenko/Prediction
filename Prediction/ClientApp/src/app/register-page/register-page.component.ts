import { Component, OnInit } from '@angular/core';

export class UserData {
    constructor(
        public firstName: string,
        public lastName: string,
        public eMail: string,
        public organization: string,
        public password: string
    ) { }
}

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent {

    firstNameInput: string = '';
    lastNameInput: string = '';
    eMailInput: string = '';
    organizationInput: string = '';
    passwordInput: string = '';

    register() {
        const userToCreate: UserData = new UserData(
            this.firstNameInput,
            this.lastNameInput,
            this.eMailInput,
            this.organizationInput,
            this.passwordInput);

        console.log(userToCreate);
    }

}
