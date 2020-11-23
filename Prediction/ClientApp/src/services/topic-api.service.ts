import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {TopicData} from '../app/topic/topic.component';

@Injectable()
export class TopicService{

    private basicUrl: string = "https://localhost:5001";
    private url: string = "/api/topics";
    constructor(private http: HttpClient){ }

    getTopics(){
        return this.http.get(this.basicUrl + this.url);
    }
    /*
    createUser(topic: TopicData){
        const myHeaders = new HttpHeaders().set("Content-Type", "application/json");
        return this.http.post(this.basicUrl + this.url, JSON.stringify(topic), {headers: myHeaders});
    }
    updateUser(topic: TopicData) {
        const myHeaders = new HttpHeaders().set("Content-Type", "application/json");
        return this.http.put(this.url, JSON.stringify(topic), {headers:myHeaders});
    }
     */
    deleteTopic(id: number){
        return this.http.delete(this.basicUrl + this.url + '/' + id);
    }


}
