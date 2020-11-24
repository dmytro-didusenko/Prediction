import { Component, OnInit } from '@angular/core';
import {TopicData} from '../topic/topic.component';
import {PredictionApiService} from '../../services/prediction-api.service';

export class PredictionData {
    constructor(
        public PredictionId: number = 0,
        public PredictionContent: string,
        public TopicId: number
    ) { }
}

@Component({
    selector: 'app-prediction',
    templateUrl: './prediction.component.html',
    styleUrls: ['./prediction.component.scss']
})
export class PredictionComponent implements OnInit {

    topics: TopicData[] = [];
    topicToChange: TopicData;
    predictionsByTopic: PredictionData[];

    predictionInput: string = '';

    constructor(public APIService: PredictionApiService) {
        this.predictionsByTopic = new Array<PredictionData>();
    }

    ngOnInit() {
        this.GetTopics();
    }

    public GetTopics() {
        this.APIService.GetTopics().subscribe(data => {
            this.topics = data;
            console.log(this.topics);
        });
    }

    public GetPredictionsByTopic(topicToChange: TopicData): void {
        this.APIService.GetPredictionByTopic(topicToChange.topicId).subscribe(
            data => {
                this.predictionsByTopic = data;
                console.log(this.predictionsByTopic);
            });
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
