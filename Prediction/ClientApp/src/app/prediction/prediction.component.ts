import { Component, OnInit } from '@angular/core';
import {PredictionApiService} from '../../services/prediction-api.service';
import {PredictionData} from '../../models/prediction-data';
import {TopicData} from '../../models/topic-data';

@Component({
    selector: 'app-prediction',
    templateUrl: './prediction.component.html',
    styleUrls: ['./prediction.component.scss']
})
export class PredictionComponent implements OnInit {

    public topics: TopicData[] = [];
    public predictionsFromDB: PredictionData[] = [];
    public topicToChange: TopicData;
    public predictionsByTopic: PredictionData[] = [];
    public predictionsGotFromServer: boolean;
    public openAddPredictionInput = false;

    public predictionInput: string = '';
    public currentUser: any;

    constructor(public APIService: PredictionApiService) { }

    ngOnInit() {
        this.currentUser = JSON.parse(localStorage.getItem("currentUser"));
        this.GetTopics();
        this.GetPredictions();
    }

    public GetTopics() {
        this.APIService.GetTopics().subscribe(data => {
            this.topics = data.filter(topic => topic.userToken === this.currentUser.token);
            //console.log(this.topics);
        });
    }

    public GetPredictions() {
        this.APIService.GetPredictions().subscribe(data => {
            this.predictionsFromDB = data;
        });
    }

    public GetPredictionsByTopic(topicToChange: TopicData): void {
        this.predictionsByTopic = [];
        for (const prediction of this.predictionsFromDB) {
            if (prediction.topicId === topicToChange.topicId) {
                this.predictionsByTopic.push(prediction);
            }
        }
    }

    public OpenAddPredictionInput(openAddPredictionInput: boolean): void {
        this.openAddPredictionInput = !openAddPredictionInput;
    }

    public AddPrediction(topicId: number): void {
        const predictionToAdd: PredictionData = new PredictionData(
            0,
            this.predictionInput,
            topicId
        );

        this.APIService.AddPrediction(predictionToAdd).subscribe( data => {
            this.GetPredictions();
            this.predictionInput = '';
        });
    }

    public deletePrediction(predictionId: number): void {
        this.APIService.DeletePrediction(predictionId).subscribe( data => {
            this.GetPredictions();
        });
    }
}
