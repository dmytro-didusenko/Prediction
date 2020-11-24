import { Component, OnInit } from '@angular/core';
import {TopicData} from '../topic/topic.component';
import {PredictionApiService} from '../../services/prediction-api.service';

export class PredictionData {
    constructor(
        public predictionId: number,
        public predictionContent: string,
        public topicId: number
    ) { }
}

@Component({
    selector: 'app-prediction',
    templateUrl: './prediction.component.html',
    styleUrls: ['./prediction.component.scss']
})
export class PredictionComponent implements OnInit {

    public topics: TopicData[] = [];
    public predictionsFromDB: PredictionData[] = [];
    public topicToChange: TopicData;
    public predictionsByTopic: PredictionData[];
    public predictionsGotFromServer: boolean;
    public openAddPredictionInput = false;

    public predictionInput: string = '';

    constructor(public APIService: PredictionApiService) { }

    ngOnInit() {
        this.GetTopics();
        this.GetPredictions();
    }

    public GetTopics() {
        this.APIService.GetTopics().subscribe(data => {
            this.topics = data;
            console.log(this.topics);
        });
    }

    public GetPredictions() {
        this.APIService.GetPredictions().subscribe(data => {
            this.predictionsFromDB = data;
            this.predictionsByTopic = data;
            console.log(this.predictionsFromDB);
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

        this.APIService.AddPrediction(predictionToAdd).subscribe();
    }
}
