import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {UserData} from '../app/register-page/register-page.component';
import {LoginData} from '../app/login-page/login-page.component';
import {TopicData} from '../app/topic/topic.component';
import {PredictionData} from '../app/prediction/prediction.component';

@Injectable({
    providedIn: 'root'
})
export class PredictionApiService {
    private basicUrl: string = 'https://localhost:5001';

    constructor(private http: HttpClient) { }

    //#region User routes

    public GetUsers(): Observable<Array<UserData>> {
        // API URL
        const url: string = '/api/Predictions/Users';

        // call to API
        let resultArray: Array<UserData> = new Array<UserData>();
        return this.http.get<Array<UserData>>(this.basicUrl + url, { observe: 'response' })
            .pipe(
                map(
                    response => {
                    resultArray = response.body;
                    return resultArray;
                    },
                    error => {
                        return new Error(error);
                    }
            ));
    }

    public AddUser(userToAdd: UserData): Observable<UserData> {
        // get API URL
        const url: string = '/api/Predictions/Users/User';

        // call to API
        let result: any = null;
        return this.http.post(this.basicUrl + url, userToAdd, { observe: 'response' })
            .pipe(
                map(
                    response => {
                    result = response.body;
                    return result;
                    },
                    error => {
                    return new Error(error);
                    }
            ));
    }

    public UserLogin(userToLogin: LoginData): Observable<UserData> {
        // get API URL
        const url: string = '/api/Predictions/Users/Login';

        // call to API
        let result: any = null;
        return this.http.post(this.basicUrl + url, userToLogin, { observe: 'response' })
            .pipe(
                map(
                    response => {
                        result = response.body;
                        return result;
                    },
                    error => {
                        return new Error(error);
                    }
            ));
    }

    //#endregion

    public GetTopics(): Observable<Array<TopicData>> {
        // API URL
        const url: string = '/api/topics';

        // call to API
        let resultArray: Array<TopicData> = new Array<TopicData>();
        return this.http.get<Array<TopicData>>(this.basicUrl + url, { observe: 'response' })
            .pipe(
                map(
                    response => {
                        resultArray = response.body;
                        return resultArray;
                    },
                    error => {
                        return new Error(error);
                    }
                ));
    }


    public GetPredictionByTopic(topicId: number): Observable<Array<PredictionData>> {
        // get API URL
        const url: string = `/api/Predictions/Topic/${topicId}/Predictions`;

        // call to API
        let result: Array<PredictionData> = new Array<PredictionData>();
        return this.http.get<Array<PredictionData>>(this.basicUrl + url, { observe: 'response' })
            .pipe(
                map(
                    response => {
                        result = response.body;
                        return result;
                    },
                    error => {
                        return new Error(error);
                    }
                ));
    }

    public AddPrediction(predictionToAdd: PredictionData): Observable<any> {
        // get API URL
        const url: string = '/api/Predictions/Prediction';

        // call to API
        let result: any = null;
        return this.http.post(this.basicUrl + url, predictionToAdd, { observe: 'response' })
            .pipe(
                map(
                    response => {
                        result = response.body;
                        return result;
                    },
                    error => {
                        return new Error(error);
                    }
                ));
    }
}
