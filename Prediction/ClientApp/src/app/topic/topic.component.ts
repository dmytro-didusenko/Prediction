import { Component, OnInit } from '@angular/core';
import {PredictionApiService} from '../../services/prediction-api.service';

export class TopicData {
    constructor(
        public TopicName: string
    ) { }
}

@Component({
  selector: 'app-register-page',
  templateUrl: './topic.component.html',
  styleUrls: ['./topic.component.scss']
})
export class TopicComponent {

    constructor(public APIService: PredictionApiService) {
    }

    firstNameInput: string = '';
    lastNameInput: string = '';
    eMailInput: string = '';
    organizationInput: string = '';
    passwordInput: string = '';

    register() {
        const userToCreate: TopicData = new TopicData(
            this.firstNameInput.trim() + ' ' + this.lastNameInput

        console.log(userToCreate); // TODO Remove after debug

        this.APIService.AddUser(userToCreate).subscribe();
    }
}
