import {Organization} from './organization';


export class User {
	_id: string;
	_rev:  string;
	username: string;
	password: string;
	firstName: string;
	lastName: string;
	organization: Organization;
	orgName:  string;
	orgDescription:  string;
	homeURL:  string;
	docType:  string;
	parentId:  string;
}

