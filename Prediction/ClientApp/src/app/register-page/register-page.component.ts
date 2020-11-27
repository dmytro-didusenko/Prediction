import { Component } from '@angular/core';
import {PredictionApiService} from '../../services/prediction-api.service';
import {UserData} from '../../models/user-data';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent {

    constructor(public APIService: PredictionApiService, private router: Router) {
    }

    firstNameInput: string = '';
    lastNameInput: string = '';
    eMailInput: string = '';
    organizationInput: string = '';
    passwordInput: string = '';
    errorMessage: string = '';

    register() {
        const userToCreate: UserData = new UserData(
            this.firstNameInput.trim() + ' ' + this.lastNameInput,
            this.eMailInput,
            this.organizationInput,
            this.passwordInput);

        this.APIService.AddUser(userToCreate).subscribe();
        this.router.navigate(['/login']);
    }
}
