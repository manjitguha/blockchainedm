import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response , URLSearchParams} from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

import { AuthenticationService } from './authentication.service';
import { ProviderService } from './provider.service';
import { Provider } from '../models/index';
import { Appointment } from '../models/index';


@Injectable()
export class AppointmentService {
	constructor(
        private http: Http, private authenticationService: AuthenticationService, private providerService : ProviderService) {
          // set token if saved in local storage
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.authenticationService.token = currentUser && currentUser.token;
    }


    scheduleAppointment(appointment: Appointment): Observable<string> {
        if (this.authenticationService && this.authenticationService.token) {
            /*Calling Blockchain*/
           
            let request = "{";
            request += `"jsonrpc": "2.0",`;
            request += `"method": "invoke",`;
            request += `"params": {`;
            request += `"type": 1,`;
            request += `"chaincodeID": {`;
            request += `"name": "d533996e1f4e228cd7165782354bce025562c1d4d0dd2abe753509498e2df386135f5dfb7590d87743f3c2c0fc2a240a533a7e45002d0632b6bdcd927efc8cfd"`;
            request += `},`;
            request += `"ctorMsg": {`;
            request += `"function": "upsertAppointment",`;
            request += `"args": [`;
            request += `"`+appointment.appointmentId+`",`;
            request += `"`+appointment.patient.patientId+`",`;
            request += `"`+appointment.patient.firstname+`",`;
            request += `"`+appointment.patient.lastname+`",`;
            request += `"`+appointment.provider.providerId+`",`;
            request += `"`+appointment.provider.firstname+`",`;
            request += `"`+appointment.provider.lastname+`",`;
            request += `"`+appointment.appointmentDate+`[`+appointment.appointmentTime+`]`+`",`;
            request += `"`+appointment.diagnosisNotes+`",`;
            request += `"`+appointment.prescriptionNotes+`",`;
            request += `"`+appointment.status+`"`;
            request += `]`;
            request += `},`;
            request += `"secureContext": "user_type1_0"`;
            request += `},`;
            request += `"id": 4`;
            request += `}`;
            
            console.log(request);

            return this.http.post('https://0ec4c0cf5a4e49ef8231e5cb859a2d7c-vp2.us.blockchain.ibm.com:5001/chaincode', request)
                .map(this.extractData)
                .catch(this.handleError);
        }
        else {
            return null;
        }
    }  

    fetchUUID(): Observable<string>{
    	if (this.authenticationService && this.authenticationService.token) {
          	/*Calling Blockchain*/
	        let request = "{";
	        request += `"jsonrpc": "2.0",`;
	        request += `"method": "query",`;
	        request += `"params": {`;
	        request += `"type": 1,`;
	        request += `"chaincodeID": {`;
	        request += `"name": "d533996e1f4e228cd7165782354bce025562c1d4d0dd2abe753509498e2df386135f5dfb7590d87743f3c2c0fc2a240a533a7e45002d0632b6bdcd927efc8cfd"},"ctorMsg": {"function": "getUUID","args": []},"secureContext": "user_type1_0"},"id": 5}`;
	        return this.http.post('https://0ec4c0cf5a4e49ef8231e5cb859a2d7c-vp2.us.blockchain.ibm.com:5001/chaincode', request)
	            .map(this.extractData)
	            .catch(this.handleError);
        }
        else {
            return null;
        }
    }

    getAppointments(): Observable<string>{
        if (this.authenticationService && this.authenticationService.token) {
              /*Calling Blockchain*/
            let request = "{";
            request += `"jsonrpc": "2.0",`;
            request += `"method": "query",`;
            request += `"params": {`;
            request += `"type": 1,`;
            request += `"chaincodeID": {`;
            request += `"name": "d533996e1f4e228cd7165782354bce025562c1d4d0dd2abe753509498e2df386135f5dfb7590d87743f3c2c0fc2a240a533a7e45002d0632b6bdcd927efc8cfd"},"ctorMsg": {"function": "getActiveUUIDs","args": []},"secureContext": "user_type1_0"},"id": 5}`;
            return this.http.post('https://0ec4c0cf5a4e49ef8231e5cb859a2d7c-vp2.us.blockchain.ibm.com:5001/chaincode', 
                request)
                .map(this.extractData)
                .catch(this.handleError);
        }
        else {
            return null;
        }
    }

    getAppointmentDetails(appointmentId: string, role: string): Observable<string>{
        if (this.authenticationService && this.authenticationService.token) {
              /*Calling Blockchain*/
            let request = "{";
            request += `"jsonrpc": "2.0",`;
            request += `"method": "query",`;
            request += `"params": {`;
            request += `"type": 1,`;
            request += `"chaincodeID": {`;
            request += `"name": "d533996e1f4e228cd7165782354bce025562c1d4d0dd2abe753509498e2df386135f5dfb7590d87743f3c2c0fc2a240a533a7e45002d0632b6bdcd927efc8cfd"},"ctorMsg": {"function": "getAppointment","args": [`;
            request += `"`;
            request += role;
            request += `"`;
            request += `,`;
            request += `"`;
            request += appointmentId;
            request += `"`;
            request += `]},"secureContext": "user_type1_0"},"id": 5}`;
            return this.http.post('https://0ec4c0cf5a4e49ef8231e5cb859a2d7c-vp2.us.blockchain.ibm.com:5001/chaincode', 
                request)
                .map(this.extractData)
                .catch(this.handleError);
        }
        else {
            return null;
        }
    }

    private extractData(res: Response) {
        let body = res.json();
        if(body.result && body.result.message){
            return body.result.message;
        }
        else{
            return "";
        }
    }

    private handleError (error: Response | any) {
        // In a real world app, we might use a remote logging infrastructure
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Observable.throw(errMsg);
    }
}