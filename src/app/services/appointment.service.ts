import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response , URLSearchParams} from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

import { AuthenticationService } from './authentication.service';
import { Provider } from '../models/index';

//var IBMBlockChainAPI = require("ibm-blockchain-js")
//var ibc = new IBMBlockChainAPI();

@Injectable()
export class AppointmentService {
	data;
    constructor(
        private http: Http, private authenticationService: AuthenticationService) {
    //	this.init();
    }

  /*  init(){
		var options = {"credentials":{"peers":[{"discovery_host":"0ec4c0cf5a4e49ef8231e5cb859a2d7c-vp3.us.blockchain.ibm.com","discovery_port":30001,"api_host":"0ec4c0cf5a4e49ef8231e5cb859a2d7c-vp3.us.blockchain.ibm.com","api_port_tls":5001,"api_port":5001,"event_host":"0ec4c0cf5a4e49ef8231e5cb859a2d7c-vp3.us.blockchain.ibm.com","event_port":31001,"type":"peer","network_id":"0ec4c0cf5a4e49ef8231e5cb859a2d7c","container_id":"a499b152e04e0941023c7abda6a90f319fcb6f48fc39620ae3119f89d5146841","id":"0ec4c0cf5a4e49ef8231e5cb859a2d7c-vp3","api_url":"http://0ec4c0cf5a4e49ef8231e5cb859a2d7c-vp3.us.blockchain.ibm.com:5001"},{"discovery_host":"0ec4c0cf5a4e49ef8231e5cb859a2d7c-vp2.us.blockchain.ibm.com","discovery_port":30001,"api_host":"0ec4c0cf5a4e49ef8231e5cb859a2d7c-vp2.us.blockchain.ibm.com","api_port_tls":5001,"api_port":5001,"event_host":"0ec4c0cf5a4e49ef8231e5cb859a2d7c-vp2.us.blockchain.ibm.com","event_port":31001,"type":"peer","network_id":"0ec4c0cf5a4e49ef8231e5cb859a2d7c","container_id":"6adb240cf6bb206086f04b08c77272218799a81d34b1286c263f9ad2e5fd262f","id":"0ec4c0cf5a4e49ef8231e5cb859a2d7c-vp2","api_url":"http://0ec4c0cf5a4e49ef8231e5cb859a2d7c-vp2.us.blockchain.ibm.com:5001"},{"discovery_host":"0ec4c0cf5a4e49ef8231e5cb859a2d7c-vp1.us.blockchain.ibm.com","discovery_port":30001,"api_host":"0ec4c0cf5a4e49ef8231e5cb859a2d7c-vp1.us.blockchain.ibm.com","api_port_tls":5001,"api_port":5001,"event_host":"0ec4c0cf5a4e49ef8231e5cb859a2d7c-vp1.us.blockchain.ibm.com","event_port":31001,"type":"peer","network_id":"0ec4c0cf5a4e49ef8231e5cb859a2d7c","container_id":"f54257d4c8938c3091f8c3a2575cb0278c4b20515e3c4e1fe13781d8a5cf710c","id":"0ec4c0cf5a4e49ef8231e5cb859a2d7c-vp1","api_url":"http://0ec4c0cf5a4e49ef8231e5cb859a2d7c-vp1.us.blockchain.ibm.com:5001"},{"discovery_host":"0ec4c0cf5a4e49ef8231e5cb859a2d7c-vp0.us.blockchain.ibm.com","discovery_port":30001,"api_host":"0ec4c0cf5a4e49ef8231e5cb859a2d7c-vp0.us.blockchain.ibm.com","api_port_tls":5001,"api_port":5001,"event_host":"0ec4c0cf5a4e49ef8231e5cb859a2d7c-vp0.us.blockchain.ibm.com","event_port":31001,"type":"peer","network_id":"0ec4c0cf5a4e49ef8231e5cb859a2d7c","container_id":"c87570b2f6661b3229f7bd719e0a4f47cab2e3ee6a93292e773c9504b28a986e","id":"0ec4c0cf5a4e49ef8231e5cb859a2d7c-vp0","api_url":"http://0ec4c0cf5a4e49ef8231e5cb859a2d7c-vp0.us.blockchain.ibm.com:5001"}],"ca":{"0ec4c0cf5a4e49ef8231e5cb859a2d7c-ca":{"url":"0ec4c0cf5a4e49ef8231e5cb859a2d7c-ca.us.blockchain.ibm.com:30001","discovery_host":"0ec4c0cf5a4e49ef8231e5cb859a2d7c-ca.us.blockchain.ibm.com","discovery_port":30001,"api_host":"0ec4c0cf5a4e49ef8231e5cb859a2d7c-ca.us.blockchain.ibm.com","api_port_tls":30001,"api_port":30001,"type":"ca","network_id":"0ec4c0cf5a4e49ef8231e5cb859a2d7c","container_id":"ef4cdbc779209918e3e5b45ab865341bd3050d68ad01c469b7a3ce44b414e57b"}},"users":[{"enrollId":"admin","enrollSecret":"6d8da06543","affiliation":"group1","username":"admin","secret":"6d8da06543"},{"enrollId":"WebAppAdmin","enrollSecret":"38638ff7eb","affiliation":"group1","username":"WebAppAdmin","secret":"38638ff7eb"},{"enrollId":"user_type1_0","enrollSecret":"f8c4a3e2fc","affiliation":"group1","username":"user_type1_0","secret":"f8c4a3e2fc"},{"enrollId":"user_type1_1","enrollSecret":"bf70e9dd42","affiliation":"group1","username":"user_type1_1","secret":"bf70e9dd42"},{"enrollId":"user_type1_2","enrollSecret":"b3038f8670","affiliation":"group1","username":"user_type1_2","secret":"b3038f8670"},{"enrollId":"user_type1_3","enrollSecret":"3183ff60b5","affiliation":"group1","username":"user_type1_3","secret":"3183ff60b5"},{"enrollId":"user_type1_4","enrollSecret":"19fd3be3a2","affiliation":"group1","username":"user_type1_4","secret":"19fd3be3a2"},{"enrollId":"user_type2_0","enrollSecret":"63594ad880","affiliation":"group1","username":"user_type2_0","secret":"63594ad880"},{"enrollId":"user_type2_1","enrollSecret":"4cb42c693f","affiliation":"group1","username":"user_type2_1","secret":"4cb42c693f"},{"enrollId":"user_type2_2","enrollSecret":"e3a5d8fdcf","affiliation":"group1","username":"user_type2_2","secret":"e3a5d8fdcf"},{"enrollId":"user_type2_3","enrollSecret":"b70d63bef3","affiliation":"group1","username":"user_type2_3","secret":"b70d63bef3"},{"enrollId":"user_type2_4","enrollSecret":"43b82db46a","affiliation":"group1","username":"user_type2_4","secret":"43b82db46a"},{"enrollId":"user_type4_0","enrollSecret":"f7f4b2fa27","affiliation":"group1","username":"user_type4_0","secret":"f7f4b2fa27"},{"enrollId":"user_type4_1","enrollSecret":"8b686cf088","affiliation":"group1","username":"user_type4_1","secret":"8b686cf088"},{"enrollId":"user_type4_2","enrollSecret":"f608dbbb05","affiliation":"group1","username":"user_type4_2","secret":"f608dbbb05"},{"enrollId":"user_type4_3","enrollSecret":"2a96d56ce7","affiliation":"group1","username":"user_type4_3","secret":"2a96d56ce7"},{"enrollId":"user_type4_4","enrollSecret":"53595ac2b7","affiliation":"group1","username":"user_type4_4","secret":"53595ac2b7"},{"enrollId":"user_type8_0","enrollSecret":"5949667a9c","affiliation":"group1","username":"user_type8_0","secret":"5949667a9c"},{"enrollId":"user_type8_1","enrollSecret":"0a41e02320","affiliation":"group1","username":"user_type8_1","secret":"0a41e02320"},{"enrollId":"user_type8_2","enrollSecret":"a4b8fdd30a","affiliation":"group1","username":"user_type8_2","secret":"a4b8fdd30a"},{"enrollId":"user_type8_3","enrollSecret":"edf4cb6973","affiliation":"group1","username":"user_type8_3","secret":"edf4cb6973"},{"enrollId":"user_type8_4","enrollSecret":"e183447164","affiliation":"group1","username":"user_type8_4","secret":"e183447164"}],"cert":"https://blockchain-certs.mybluemix.net/us.blockchain.ibm.com.cert","cert_path":"/certs/peer/cert.pem"}};

		ibc.load(options, function(err, data){
			alert(err);
			alert(data);
	    });
    }
*/

    scheduleAppointment(): Observable<Provider[]> {
        if (this.authenticationService && this.authenticationService.token) {
           // add authorization header with jwt token
            let headers = new Headers({ 'Authorization': 'Bearer ' + this.authenticationService.token });
            let options = new RequestOptions({ headers: headers });

            // get users from api
            return this.http.get('/api/providers', options)
                .map((response: Response) => response.json());
        }
        else {
            return null;
        }
    }  

    fetchUUID(): Observable<string>{
    	if (this.authenticationService && this.authenticationService.token) {
            // add authorization header with jwt token
            let headers = new Headers({ 'Authorization': 'Bearer ' + this.authenticationService.token });
            let options = new RequestOptions({ headers: headers });

			/*Calling Blockchain*/
	        let request = "{";
	        request += `"jsonrpc": "2.0",`;
	        request += `"method": "query",`;
	        request += `"params": {`;
	        request += `"type": 1,`;
	        request += `"chaincodeID": {`;
	        request += `"name": "d6c0166b94b978f5380b946217a3348849be199b2e2583f9752f0f5e0bbc6348864a7c8cb32c9a5ed3c7f2134cbf7257bec404e2d1502cd94b210bbec4013956"},"ctorMsg": {"function": "getUUID","args": []},"secureContext": "user_type1_0"},"id": 5}`;
	        return this.http.post('https://0ec4c0cf5a4e49ef8231e5cb859a2d7c-vp2.us.blockchain.ibm.com:5001/chaincode', request)
	            .map(this.extractData)
	            .catch(this.handleError);

	        /*Calling Blockchain*/

          	//return null;
        }
        else {
            return null;
        }
    }

    private extractData(res: Response) {
	    let body = res.json();
	    return body.data || { };
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