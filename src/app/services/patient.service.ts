import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'


import { AuthenticationService } from './authentication.service';
import { Patient } from '../models/index';

@Injectable()
export class PatientService {
    constructor(
        private http: Http, private authenticationService: AuthenticationService) {
    }

    getPatients(firstname: string, middlename: string, lastname: string): Observable<Patient[]> {
        if (this.authenticationService && this.authenticationService.token) {
           
            // get users from api
            return this.http.post('http://blockchaindemoedm.mybluemix.net/api/patient', JSON.stringify({ firstname: firstname, middlename: middlename, lastname: lastname }))
                .map((response: Response) => response.json());
        }
        else {
            return null;
        }
    }

    createPatient(firstname: string,
        middlename: string,
        lastname: string,
        address: string,
        city: string,
        state: string,
        zip: string,
        gender: string,
        dateofbirth: string): Observable<Patient> {
        alert(firstname);
        if (this.authenticationService && this.authenticationService.token) {
            // get users from api
            return this.http.post('http://blockchaindemoedm.mybluemix.net/api/patient', JSON.stringify({
                firstname: firstname,
                middlename: middlename,
                lastname: lastname,
                address: address,
                city: city,
                state: state,
                zip: zip,
                gender: gender,
                dateofbirth: dateofbirth
            }))
                .map((response: Response) => response.json());
        }
        else {
            return null;
        }
    }
}