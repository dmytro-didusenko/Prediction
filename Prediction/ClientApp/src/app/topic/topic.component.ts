import { Component, OnInit } from '@angular/core';
import {TopicService} from "../../services/topic-api.service";
import {TemplateRef, ViewChild} from '@angular/core';
import {Observable} from 'rxjs';

export class TopicData {
    constructor(
        public topicId: number,
        public topicName: string,
        public userId: number
    ) { }
}

@Component({
  selector: 'app-topic-page',
  templateUrl: './topic.component.html',
  styleUrls: ['./topic.component.scss'],
    providers: [TopicService]
})
export class TopicComponent implements OnInit {

    @ViewChild('readOnlyTemplate', {static: false}) readOnlyTemplate: TemplateRef<any>;
    @ViewChild('editTemplate', {static: false}) editTemplate: TemplateRef<any>;

    editedTopic: TopicData;
    topics: Array<TopicData>;
    statusMessage: string;
    isNewRecord: boolean;

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

    addTopic() {
        this.editedTopic = new TopicData(0,"",1);
        this.topics.push(this.editedTopic);
        this.isNewRecord = true;
    }

    editTopic(topic: TopicData) {
        this.editedTopic = new TopicData(topic.topicId, topic.topicName, topic.userId);
    }

    loadTemplate(topic: TopicData) {
        if (this.editedTopic && this.editedTopic.topicId === topic.topicId) {
            return this.editTemplate;
        } else {
            return this.readOnlyTemplate;
        }
    }

    saveTopic() {
        if (this.isNewRecord) {
            this.APIService.createTopic(this.editedTopic).subscribe(data => {
                this.statusMessage = 'Данные успешно добавлены',
                    this.loadTopics();
            });
            this.isNewRecord = false;
            this.editedTopic = null;
        } else {
            this.APIService.updateTopic(this.editedTopic).subscribe(data => {
                this.statusMessage = 'Данные успешно обновлены',
                    this.loadTopics();
            });
            this.editedTopic = null;
        }
    }

    cancel() {
        if (this.isNewRecord) {
            this.topics.pop();
            this.isNewRecord = false;
        }
        this.editedTopic = null;
    }
}
