import { Component } from '@angular/core';
import {PredictionApiService} from '../../services/prediction-api.service';
import {UserData} from '../../models/user-data';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent {

    constructor(public APIService: PredictionApiService) {
    }

    firstNameInput: string = '';
    lastNameInput: string = '';
    eMailInput: string = '';
    organizationInput: string = '';
    passwordInput: string = '';

    register() {
        const userToCreate: UserData = new UserData(
            this.firstNameInput.trim() + ' ' + this.lastNameInput,
            this.eMailInput,
            this.organizationInput,
            this.passwordInput);

        console.log(userToCreate); // TODO Remove after debug

        this.APIService.AddUser(userToCreate).subscribe();
    }
}
