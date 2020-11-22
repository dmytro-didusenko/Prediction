import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {UserData} from '../app/register-page/register-page.component';

@Injectable({
    providedIn: 'root'
})
export class PredictionApiService {
    private basicUrl: string = 'https://localhost:5001';

    constructor(private http: HttpClient) { }

    public GetUsers(): Observable<Array<UserData>> {
        // API URL
        let url: string = '/api/Predictions/Users';

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
}
