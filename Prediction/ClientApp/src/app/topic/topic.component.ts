import { Component, OnInit } from '@angular/core';
import {TopicService} from "../../services/topic-api.service";
import {TemplateRef, ViewChild} from '@angular/core';
import {Observable} from 'rxjs';

export class TopicData {
    constructor(
        public TopicId: number,
        public TopicName: string,
        public UserId: number
    ) { }
}

@Component({
  selector: 'app-topic-page',
  templateUrl: './topic.component.html',
  styleUrls: ['./topic.component.scss'],
    providers: [TopicService]
})
export class TopicComponent implements OnInit {

    topics: Array<TopicData>;
    statusMessage: string;

    constructor(public APIService: TopicService) {
        this.topics = new Array<TopicData>();
    }

    ngOnInit() {
        this.loadTopics();
    }

    private loadTopics() {
        this.APIService.getTopics().subscribe((data: TopicData[]) => {
            this.topics = data;
        });
    }
    public deleteTopic(id){
        this.APIService.deleteTopic(id).subscribe(data => {
            this.statusMessage = 'Данные успешно удалены',
                this.loadTopics();
        })
    }
}
