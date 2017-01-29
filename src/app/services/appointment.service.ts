import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response , URLSearchParams} from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

import { BlockChainRequest } from '../models/index';
import { Params } from '../models/index';
import { ChainCodeId } from '../models/index';
import { CTorMessage } from '../models/index';

import { AuthenticationService } from './authentication.service';
import { ProviderService } from './provider.service';
import { Provider } from '../models/index';
import { Appointment } from '../models/index';
import { CONSTANTS } from '../helpers/constants';

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
            let request = this.createBlockChainRequest("invoke");   
            request.params.ctorMsg.function = "upsertAppointment";
            request.params.ctorMsg.args.push(appointment.appointmentId);
            request.params.ctorMsg.args.push(appointment.patientId);
            request.params.ctorMsg.args.push(appointment.providerId);
            request.params.ctorMsg.args.push(appointment.referralProviderId);
            request.params.ctorMsg.args.push(appointment.pharmacyId);
            request.params.ctorMsg.args.push(appointment.secretoryId);
            request.params.ctorMsg.args.push(appointment.laboratoryId);
            request.params.ctorMsg.args.push(appointment.appointmentDate);
            request.params.ctorMsg.args.push(appointment.appointmentTime);
            request.params.ctorMsg.args.push(appointment.diagnosisNotes);
            request.params.ctorMsg.args.push(appointment.prescriptionNotes);
            request.params.ctorMsg.args.push(appointment.laboratoryNotes);
            request.params.ctorMsg.args.push(appointment.currentlyAssignedTo);
            request.params.ctorMsg.args.push(appointment.status);
        
            console.log(JSON.stringify(request));

            return this.http.post(CONSTANTS.chaincodeURL, request)
                .map(this.extractData)
                .catch(this.handleError);
        }
        else {
            return null;
        }
    }  

    fetchUUID(): Observable<string>{
    	if (this.authenticationService && this.authenticationService.token) {
            let request = this.createBlockChainRequest("query");          	
            request.params.ctorMsg.function = "getUUID";
            console.log(JSON.stringify(request));
              /*Calling Blockchain*/
	        return this.http.post(CONSTANTS.chaincodeURL, request)
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
            let request = `{"jsonrpc": "2.0", "method": "query", "params": {"type": 1,"chaincodeID": {"name": "`;
            request += CONSTANTS.chaincodeId;
            request += `"},"ctorMsg": {"function": "getActiveUUIDs","args": []},"secureContext": "user_type1_0"},"id": 5}`;
            return this.http.post(CONSTANTS.chaincodeURL, request)
                .map(this.extractData)
                .catch(this.handleError);
        }
        else {
            return null;
        }
    }

    getAppointmentsForId(id: string): Observable<string>{
        if (this.authenticationService && this.authenticationService.token) {
            /*Calling Blockchain*/
            let request = this.createBlockChainRequest("query");              
            request.params.ctorMsg.function = "getActiveUUIDsForID";
            request.params.ctorMsg.args.push(id);
            console.log(JSON.stringify(request));
           
            return this.http.post(CONSTANTS.chaincodeURL, request)
                .map(this.extractData)
                .catch(this.handleError);
        }
        else {
            return null;
        }
    }

    getAppointmentDetails(appointmentId: string, role: string): Observable<string>{
        if (this.authenticationService && this.authenticationService.token) {
            let request = this.createBlockChainRequest("query");              
            request.params.ctorMsg.function = "getAppointment";
            request.params.ctorMsg.args.push(role);
            request.params.ctorMsg.args.push(appointmentId);
            return this.http.post(CONSTANTS.chaincodeURL, 
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

    private createBlockChainRequest(method: string){
        let blockchainRequest: BlockChainRequest = new BlockChainRequest();
        blockchainRequest.id = 1;
        blockchainRequest.jsonrpc = "2.0";
        blockchainRequest.method = method;
        blockchainRequest.params = new Params();
        blockchainRequest.params.type = 1;
        blockchainRequest.params.chaincodeID = new ChainCodeId();
        blockchainRequest.params.chaincodeID.name = CONSTANTS.chaincodeId;
        blockchainRequest.params.secureContext = "admin";
        blockchainRequest.params.ctorMsg = new CTorMessage();
        blockchainRequest.params.ctorMsg.function = "";
        blockchainRequest.params.ctorMsg.args = [];
        return blockchainRequest;
    }
}