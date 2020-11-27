import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import {PredictionApiService} from '../../services/prediction-api.service';
import {TopicData} from '../../models/topic-data';
import {PredictionData} from '../../models/prediction-data';

@Component({
    selector: 'app-user-page',
    templateUrl: './user-page.component.html',
    styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent implements OnInit {

    public userToken: string = '2';
    public topics: TopicData[] = [];
    public topicToChange: TopicData;
    public predictionByTopic: PredictionData;
    public currentUser: any;

    constructor(public APIService: PredictionApiService) { }

    ngOnInit() {
        this.GetTopics();
        this.currentUser = JSON.parse(localStorage.getItem("currentUser"));
    }

    public GetTopics() {
        this.APIService.GetTopics().subscribe(data => {
            this.topics = data;
            console.log(this.topics);
        });
    }

    public GetPredictionsByTopic(topicToChange: TopicData): void {
        this.predictionByTopic = null;
        this.APIService.GetRandomPrediction(this.userToken, topicToChange.topicName).subscribe(
            data => {
                this.predictionByTopic = data;
                console.log(this.predictionByTopic);
            }
        );
    }
}
