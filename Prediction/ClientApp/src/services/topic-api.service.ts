import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {TopicData} from '../models/topic-data';
import {basicUrl} from "./basicUrl";

@Injectable()
export class TopicService {

    private url: string = '/api/topics';

    constructor (private http: HttpClient) { }

    getTopics() {
        return this.http.get(basicUrl.apiUrl + this.url);
    }

    createTopic(topic: TopicData) {
        const myHeaders = new HttpHeaders().set('Content-Type', 'application/json');
        return this.http.post(basicUrl.apiUrl + this.url, JSON.stringify(topic), {headers: myHeaders});

    }

    updateTopic(topic: TopicData) {
        const myHeaders = new HttpHeaders().set('Content-Type', 'application/json');
        return this.http.put(basicUrl.apiUrl + this.url, JSON.stringify(topic), {headers: myHeaders});
    }

    deleteTopic(id: number) {
        return this.http.delete(basicUrl.apiUrl + this.url + '/' + id);
    }
}
