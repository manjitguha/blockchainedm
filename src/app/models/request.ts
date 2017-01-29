export class Request {
	selector: Selector;
	fields: string[];
}

export class Selector {
	_id: Condition;
	username: Condition;
	password: Condition;
}

export class Condition{
	$eq: string;
}