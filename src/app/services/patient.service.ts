import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response , URLSearchParams} from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'

import { CONSTANTS } from '../helpers/constants'

import { AuthenticationService } from './authentication.service';
import { Patient } from '../models/index';
import { Request } from '../models/index';
import { Condition } from '../models/index';
import { Selector } from '../models/index';


@Injectable()
export class PatientService {
    constructor(
        private http: Http, private authenticationService: AuthenticationService) {
           // set token if saved in local storage
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.authenticationService.token = currentUser && currentUser.token;
    }

    getPatients(): Observable<Patient[]> {
        if (this.authenticationService && this.authenticationService.token) {
            let headers = new Headers({ 'Content-Type': 'application/json' });
            let options = new RequestOptions({ headers: headers });

            return this.http.get(CONSTANTS.patientAllDocsURL, options)
                .map((response: Response) => {
                    return response.json().body;
                });
        }
        else {
            return null;
        }
    }

    getPatientDetail(patientId: string): Observable<Patient[]> {
        if (this.authenticationService && this.authenticationService.token) {
            let headers = new Headers({ 'Content-Type': 'application/json' });
            let options = new RequestOptions({ headers: headers });
            let request: Request = new Request();
            request.selector = new Selector();
            request.selector._id = new Condition();
            request.selector._id.$eq = patientId;
            request.fields=[];
            return this.http.post(CONSTANTS.patientSearchURL,JSON.stringify(request), options)
                .map((response: Response) => {
                    return response.json().body;
                });
        }
        else {
            return null;
        }
    }
}