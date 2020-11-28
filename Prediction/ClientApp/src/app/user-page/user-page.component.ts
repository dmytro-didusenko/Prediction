import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import {PredictionApiService} from '../../services/prediction-api.service';
import {TopicData} from '../../models/topic-data';
import {PredictionData} from '../../models/prediction-data';
import {basicUrl} from '../../services/basicUrl';

@Component({
    selector: 'app-user-page',
    templateUrl: './user-page.component.html',
    styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent implements OnInit {

    public topics: TopicData[] = [];
    public topicToChange: TopicData;
    public predictionByTopic: PredictionData;
    public currentUser: any;
    public isPrediction: boolean = true;
    public predictionToDisplay: string = '';
    public predictionByURL: string = '';

    constructor(public APIService: PredictionApiService) { }

    ngOnInit() {
        this.currentUser = JSON.parse(localStorage.getItem("currentUser"));
        this.GetTopics();
    }

    public GetTopics() {
        this.APIService.GetTopics().subscribe(data => {
            this.topics = data.filter(topic => topic.userToken === this.currentUser.token);
        });
    }

    public GetPredictionString(topicToChange): void {
        this.predictionByURL = basicUrl.apiUrl +
            `/api/Predictions/Random/${this.currentUser.token}/${this.topicToChange.topicName}`;
    }

    public GetPredictionsByTopic(topicToChange: TopicData): void {
        this.predictionByTopic = null;
        this.APIService.GetRandomPrediction(this.currentUser.token, topicToChange.topicName).subscribe(
            data => {
                this.predictionByTopic = data;
                this.predictionToDisplay = this.predictionByTopic.predictionContent;
            },
            error => {
                this.predictionToDisplay = 'Передбачення для обраї теми відсутнє';
            }
        );
    }
}
