import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import {TopicService} from "../../services/topic-api.service";
import {TemplateRef, ViewChild} from '@angular/core';
import {Observable} from 'rxjs';
import {TopicData} from '../../models/topic-data';

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
    currentUser: any;

    constructor(public APIService: TopicService) {
        this.topics = new Array<TopicData>();
    }

    ngOnInit() {
        this.currentUser = JSON.parse(localStorage.getItem("currentUser"));
        this.loadTopics();
    }


    private loadTopics() {
        this.APIService.getTopics().subscribe((data: TopicData[]) => {
            this.topics = data.filter(topic => topic.userToken === this.currentUser.token);
        });
    }

    public deleteTopic(id) {
        this.APIService.deleteTopic(id).subscribe(data => {
            this.statusMessage = 'Данные успешно удалены',
                this.loadTopics();
        });
    }

    addTopic() {
        this.editedTopic = new TopicData(0,"",this.currentUser.userID, this.currentUser.token);
        this.topics.push(this.editedTopic);
        this.isNewRecord = true;
    }

    editTopic(topic: TopicData) {
        this.editedTopic = new TopicData(topic.topicId, topic.topicName, topic.userId, topic.userToken);
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
