import { Http, BaseRequestOptions, Response, ResponseOptions, RequestMethod } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { USERS } from './fake-users';
import { User } from '../models/index';
import { PATIENTS } from './fake-patients';
import { Patient } from '../models/index';
import { PROVIDERS } from './fake-providers';
import { Provider } from '../models/index';



export let fakeBackendProvider = {
    // use fake backend in place of Http service for backend-less development
    provide: Http,
    useFactory: (backend: MockBackend, options: BaseRequestOptions) => {
        // configure fake backend
        backend.connections.subscribe((connection: MockConnection) => {
            // wrap in timeout to simulate server api call
            setTimeout(() => {
               // fake authenticate api end point
                if (connection.request.url.endsWith('/api/authenticate') && connection.request.method === RequestMethod.Post) {
                    // get parameters from post request
                    let params = JSON.parse(connection.request.getBody());
                    var userExists = 1;
                    var loggedInUser ;
                    for (let user in USERS) {
                        // check user credentials and return fake jwt token if valid
                        if (params.username === USERS[user].username && params.password === USERS[user].password) {
                            userExists = 0;
                            loggedInUser = USERS[user];
                            break;
                        } 
                    }
                    if (userExists == 0) {
                        connection.mockRespond(new Response(
                            new ResponseOptions({ status: 200, body: { token: 'fake-jwt-token' , loggedIdUser:loggedInUser} })
                        ));
                    }
                    else {
                        connection.mockRespond(new Response(
                            new ResponseOptions({ status: 200 })
                        ));
                    }

                }

                // fake users api end point
                if (connection.request.url.endsWith('/api/users') && connection.request.method === RequestMethod.Get) {
                    // check for fake auth token in header and return test users if valid, this security is implemented server side
                    // in a real application
                    if (connection.request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                        connection.mockRespond(new Response(
                            new ResponseOptions({ status: 200, body: USERS })
                        ));
                    } else {
                        // return 401 not authorised if token is null or invalid
                        connection.mockRespond(new Response(
                            new ResponseOptions({ status: 401 })
                        ));
                    }
                }

                // fake patients api end point
                if (connection.request.url.endsWith('/api/patients') && connection.request.method === RequestMethod.Get) {
                    // check for fake auth token in header and return test users if valid, this security is implemented server side
                    // in a real application
                    if (connection.request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                        connection.mockRespond(new Response(
                            new ResponseOptions({ status: 200, body: PATIENTS })
                        ));
                    } else {
                        // return 401 not authorised if token is null or invalid
                        connection.mockRespond(new Response(
                            new ResponseOptions({ status: 401 })
                        ));
                    }
                }

                // fake patients api end point
                if (connection.request.url.includes('/api/patientDetail') && connection.request.method === RequestMethod.Post) {
                    // check for fake auth token in header and return test users if valid, this security is implemented server side
                    // in a real application
                    if (connection.request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                        let params = JSON.parse(connection.request.getBody());

                        for (let patient in PATIENTS) {
                            if(params.patientId === PATIENTS[patient].patientId){
                                connection.mockRespond(new Response(
                                    new ResponseOptions({ status: 200, body: PATIENTS[patient] })
                                ));
                                break;
                            }
                        }

                    } else {
                        // return 401 not authorised if token is null or invalid
                        connection.mockRespond(new Response(
                            new ResponseOptions({ status: 401 })
                        ));
                    }
                }
                

                // fake patients api end point
                if (connection.request.url.endsWith('/api/providers') && connection.request.method === RequestMethod.Get) {
                    // check for fake auth token in header and return test users if valid, this security is implemented server side
                    // in a real application
                    if (connection.request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                        connection.mockRespond(new Response(
                            new ResponseOptions({ status: 200, body: PROVIDERS })
                        ));
                    } else {
                        // return 401 not authorised if token is null or invalid
                        connection.mockRespond(new Response(
                            new ResponseOptions({ status: 401 })
                        ));
                    }
                }

                // fake patients api end point
                if (connection.request.url.includes('/api/providerDetail') && connection.request.method === RequestMethod.Post) {
                    // check for fake auth token in header and return test users if valid, this security is implemented server side
                    // in a real application
                    if (connection.request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                        let params = JSON.parse(connection.request.getBody());

                        for (let providers in PROVIDERS) {
                            if(params.providerId === PROVIDERS[providers].providerId){
                                connection.mockRespond(new Response(
                                    new ResponseOptions({ status: 200, body: PROVIDERS[providers] })
                                ));
                                break;
                            }
                        }

                    } else {
                        // return 401 not authorised if token is null or invalid
                        connection.mockRespond(new Response(
                            new ResponseOptions({ status: 401 })
                        ));
                    }
                }
            }, 500);

        });

        return new Http(backend, options);
    },
    deps: [MockBackend, BaseRequestOptions]
};