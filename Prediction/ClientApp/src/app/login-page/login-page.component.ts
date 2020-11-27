import { Component, OnInit } from '@angular/core';
import {PredictionApiService} from '../../services/prediction-api.service';
import {LoginData} from '../../models/login-data';
import {UserData} from '../../models/user-data';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {

    userUserLoginInput: string = '';
    userPasswordInput: string = '';
    error: boolean = false;

    constructor(public APIService: PredictionApiService, private router: Router) { }

    login(): void {
        const userLogin: LoginData = new LoginData(
            this.userUserLoginInput,
            this.userPasswordInput
        );

        let user: UserData = null;

        this.APIService.UserLogin(userLogin).subscribe(response => {
            user = response;
            localStorage.setItem("currentUser", JSON.stringify(user));
            this.router.navigate(['/topic']);
        },
        error => {
            localStorage.removeItem("currentUser");
            this.error = true;
            });
    }
}
