import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {UserData} from '../app/register-page/register-page.component';

@Injectable({
    providedIn: 'root'
})
export class PredictionApiService {
    private basicUrl: string = 'https://localhost:5001';

    constructor(private http: HttpClient) { }

    // public AddUser(userToAdd: UserData): Observable<UserData> {
    //
    // }

}
