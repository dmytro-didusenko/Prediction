import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {TopicData} from '../models/topic-data';
import {PredictionData} from '../models/prediction-data';
import {UserData} from '../models/user-data';
import {LoginData} from '../models/login-data';
import {basicUrl} from "./basicUrl";

@Injectable({
    providedIn: 'root'
})
export class PredictionApiService {
    //private basicUrl: string = 'https://localhost:5001';

    constructor(private http: HttpClient) { }

    //#region User routes

    public GetUsers(): Observable<Array<UserData>> {
        // API URL
        const url: string = '/api/Predictions/Users';

        // call to API
        let resultArray: Array<UserData> = new Array<UserData>();
        return this.http.get<Array<UserData>>(basicUrl.apiUrl + url, { observe: 'response' })
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
        return this.http.post(basicUrl.apiUrl + url, userToAdd, { observe: 'response' })
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
        return this.http.post(basicUrl.apiUrl + url, userToLogin, { observe: 'response' })
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
        return this.http.get<Array<TopicData>>(basicUrl.apiUrl + url, { observe: 'response' })
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

    //#region Prediction routes

    public GetPredictions(): Observable<Array<PredictionData>> {
        // get API URL
        const url: string = '/api/Predictions';

        // call to API
        let result: Array<PredictionData> = new Array<PredictionData>();
        return this.http.get<Array<PredictionData>>(basicUrl.apiUrl + url, { observe: 'response' })
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

    public GetPredictionByTopic(topicId: number): Observable<Array<PredictionData>> {
        // get API URL
        const url: string = `/api/Predictions/Topic/${topicId}/Predictions`;

        // call to API
        let result: Array<PredictionData> = new Array<PredictionData>();
        return this.http.get<Array<PredictionData>>(basicUrl.apiUrl + url, { observe: 'response' })
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
        return this.http.post(basicUrl.apiUrl + url, predictionToAdd, { observe: 'response' })
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

    public DeletePrediction(predictionId: number): Observable<boolean> {
        // get API URL
        const url: string = `/api/Predictions/Delete/${predictionId}`;

        // call to API
        let deleteResult: any = false;
        return this.http.delete(basicUrl.apiUrl + url, { observe: 'response' })
            .pipe(
                map(
                    response => {
                        deleteResult = response.body;
                        return deleteResult;
                    },
                    error => {
                        return new Error(error);
                    }
                ));
    }

    public GetRandomPrediction(userToken: string, topicName: string): Observable<PredictionData> {
        // get API URL
        const url: string = `/api/Predictions/Random/User/${userToken}/Topic/${topicName}`;

        // call to API
        let result: any = null;
        return this.http.get(basicUrl.apiUrl + url, {observe: 'response'})
            .pipe(
                map(
                    response => {
                        result = result.body;
                        return result;
                    },
                    error => {
                        return new Error(error);
                    }
                ));
    }

    //#endregion
}
